import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninInput = z.infer<typeof signinInput>;
export declare const createBlogInput: z.ZodObject<{
    content: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
}, "strip", z.ZodTypeAny, {
    content: {};
}, {
    content: {};
}>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export declare const updateBlogInput: z.ZodObject<{
    content: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: {};
    id: string;
}, {
    content: {};
    id: string;
}>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
