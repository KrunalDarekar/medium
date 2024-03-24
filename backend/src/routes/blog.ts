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
            content: body.content,
            authorId: c.get("userId")
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
                content: body.content
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
        select: {
            content: true,
            author: {
                select: {
                    name: true,
                }
            },
            id: true,
            createdAt: true,
        }
    })

    return c.json({
        blogs
    })
})
  
blogRouter.get("/:id", async(c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        const id = c.req.param('id')
    
        const blog = await prisma.post.findUnique({
            where: {
                id
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
                createdAt: true,
                authorId: true,
            }
        })
        if(!blog) {
            c.status(411)
            return c.json({
                error: "error while fetching blog"
            })
        }
    
        return c.json(blog)
    } catch(e) {
        c.status(411)
        return c.json({
            message: "error while fetching"
        })
    }

})