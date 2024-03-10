import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@krunal-darekar/medium-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>()

userRouter.get('/me', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const headers = c.req.header("authorization") || ""
  const token = headers.split(' ')[1]
  if(!token) {
    c.status(403)
    return c.json({
      error: "no token found"
    })
  }
  
  try {
    const res = await verify(token, c.env.JWT_SECRET)
    if(!res.id){
    c.status(403)
    return c.json({ 
      error : "token has expired sign in again"})
    }

    const response = await prisma.user.findFirst({
      where: {
        id: res.id
      },
      select: {
        name: true,
        email: true,
        description: true,
      }
    })

    return c.json(response)

  } catch(e) {
    c.status(403)
    return c.json({
      error: "user not signed in"
    })
  }
})

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()

    const {success} = signupInput.safeParse(body)

    if(!success) {
      c.status(411)
      return c.json({
        error: "invalid inputs"
      })
    }
  
    try {
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        }
      })
      const token = await sign( {id: user.id} , c.env.JWT_SECRET)
      return c.json({
        jwt: token
      })
    } catch(e) {
      c.status(411)
      return c.json({
        error: "error while signup"
      })
    }
  })
  
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = signinInput.safeParse(body)
    if(!success) {
      c.status(411)
      return c.json({
        error: "invalid inputs"
      })
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password
        }
      })
    
      if(!user) {
        c.status(403)
        return c.json({
          error: "Invalid user credentials"
        })
      }
    
      const token = await sign( {id: user.id} , c.env.JWT_SECRET)
    
      return c.json({
        jwt: token
      })
    } catch(e) {
      c.status(403)
      return c.json({
        error: "invalid user credentials"
      })
    }
  
  })