import {cookies} from "next/headers";
import {User} from "@/app/lib/definitions";

const STRAPI_URL = process.env.STRAPI_URL;
//get user data by auth token
export async function fetchUser(id?: number | string): Promise<User | null> {
    const authToken = cookies().get("authRe")?.value;
    
    try {
        const response = await fetch(STRAPI_URL + "/api/users/me", {
            headers: {Authorization: "Bearer " + authToken},
            cache: "no-store",
        });
        const user = await response.json();
        
        if (id && user.id != id || user.error) {
            return null;
        }
        
        return user;
    } catch (error) {
        throw new Error("Unauthorized error.");
    }
}