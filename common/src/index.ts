import z from "zod"

export const signupInput  = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput  = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type SigninInput = z.infer<typeof signinInput>

export const createBlogInput = z.object({
    content: z.object({}),
    image: z.object({
        imageUrl: z.string(),
        publicId: z.string()
    }),
    published: z.boolean()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    content: z.object({}),
    image: z.object({
        imageUrl: z.string(),
        publicId: z.string()
    }),
    id: z.string().uuid(),
    published: z.boolean()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>

