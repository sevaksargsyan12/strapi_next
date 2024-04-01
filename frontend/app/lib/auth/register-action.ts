"use server";

import {z} from "zod";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email().min(2).max(50),
    password: z.string().min(6).max(100),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

export async function registerAction(prevState: any, formData: any) {
    const STRAPI_URL = process.env.STRAPI_URL;
    if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");
    const url = `${STRAPI_URL}/api/auth/local/register`;
    
    const validatedFields = formSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
    });
    
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Register.",
        };
    }
    
    const {username, email, password, firstName, lastName} = validatedFields.data;
    
    try {
        const response: any = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, email, password, firstName, lastName, reviewCreationDate: new Date()}),
            cache: "no-cache",
        });
        
        const data = await response.json();
        if (!response.ok && data.error)
            return {...prevState, message: data.error.message, errors: null};
        if (response.ok && data.jwt) cookies().set({
            name: 'authRe',
            value: data.jwt,
            httpOnly: true,
            path: '/',
        })
    } catch (error) {
        return {error: "Server error please try again later."};
    }
    redirect("/dashboard");
}
