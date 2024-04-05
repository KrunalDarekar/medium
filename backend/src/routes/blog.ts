import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@krunal-darekar/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
    Variables: {
        userId: string
    }
}>()

export const authMiddleware =  async (c:any , next:any) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1]
  
    if(!token){
      c.status(403)
      return c.json({ error : "user unauthorised"})
    }

    try {
        const res = await verify(token, c.env.JWT_SECRET)
  
        if(!res.id){
        c.status(403)
        return c.json({ error : "user unauthorised"})
        }

        c.set('userId', res.id)
        await next()
    } catch(e) {
        return c.json({
            error: "user unauthorised"
        })
    }
  }

const pseudoAuthMiddleware =  async (c:any , next:any) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1]
  
    if(!token){
      c.status(403)
      return c.json({ error : "user unauthorised"})
    }

    try {
        const res = await verify(token, c.env.JWT_SECRET)
  
        if(!res.id){
        c.status(403)
        return c.json({ error : "user unauthorised"})
        }

        c.set('userId', res.id)
        await next()
    } catch(e) {
        await next()
    }
}


blogRouter.post("/", authMiddleware, async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)
    if(!success) {
        c.status(411)
        return c.json({
            error: "invalid inputs"
        })
    }

    const blog = await prisma.post.create({
        data: {
            image: body.image,
            content: body.content,
            authorId: c.get("userId"),
            published: body.published,
        }
    })
    return c.json({
        id: blog.id
    })
})
  
blogRouter.put("/", authMiddleware , async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const {success} = updateBlogInput.safeParse(body)
    if(!success) {
        c.status(411)
        return c.json({
            error: "invalid inputs"
        })
    }

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: c.get('userId')
            },
            data: {
                image: body.image,
                content: body.content,
                published: body.published
            }
        })
        return c.json({
            id: blog.id
        })
    } catch {
        c.status(403)
        return c.json({
            error: "error while updating blog"
        })
    }

})

blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        where: {
            published: true,
        },
        select: {
            content: true,
            author: {
                select: {
                    name: true,
                }
            },
            image: true,
            id: true,
            createdAt: true,
            authorId: true,
        }
    })

    return c.json({
        blogs
    })
})

blogRouter.get('/my', authMiddleware, async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        where: {
            authorId: c.get('userId')
        },
        select: {
            content: true,
            author: {
                select: {
                    name: true,
                }
            },
            image: true,
            id: true,
            createdAt: true,
            authorId: true,
            published: true,
        }
    })

    return c.json({
        blogs
    })
})
  
blogRouter.get("/:id", pseudoAuthMiddleware, async(c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        const id = c.req.param('id')
        const userId = c.get('userId')
    
        const blog = await prisma.post.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                content: true,
                author: {
                    select: {
                        name: true,
                        description: true
                    }
                },
                image: true,
                createdAt: true,
                authorId: true,
                published: true,
            }
        })

        if(!blog) {
            c.status(411)
            return c.json({
                error: "error while fetching blog"
            })
        }

        if(!blog.published) {
            if(blog.authorId === userId) {
                return c.json(blog)
            } else {
                c.status(411)
                return c.json({
                    error: "error while fetching blog"
                })
            }
        }
    
        return c.json(blog)
    } catch(e) {
        c.status(411)
        return c.json({
            message: "error while fetching"
        })
    }

})

blogRouter.delete('/:id', authMiddleware , async(c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        const id = c.req.param('id')
        const userId = c.get('userId')

        console.log(userId)

        const blog = await prisma.post.delete({
            where: {
                id,
                authorId: userId
            }
        })

        return c.json({
            message: "blog deleted successfully"
        })
    } catch(e) {
        console.log(e)
        c.status(411)
        return c.json({
            error: "error while deleting the blog"
        })
    }
})