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
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export declare const createCommentInput: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export declare const updateCommentInput: z.ZodObject<{
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    id: string;
}, {
    content: string;
    id: string;
}>;
export declare type signupInput = z.infer<typeof signupInput>;
export declare type signinInput = z.infer<typeof signinInput>;
export declare type createBlogInput = z.infer<typeof createBlogInput>;
export declare type updateBlogInput = z.infer<typeof updateBlogInput>;
export declare type createCommentInput = z.infer<typeof createCommentInput>;
export declare type updateCommentInput = z.infer<typeof updateCommentInput>;
