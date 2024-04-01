import { type NextRequest } from 'next/server'

const STRAPI_URL = process.env.STRAPI_URL;

//get users by reviewCreationDate, limit, offset
export async function GET( request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const limit = searchParams.get('limit');
        const offset = searchParams.get('start');
        const params = new URLSearchParams();
        limit && params.append('limit', limit);
        offset && params.append('start', offset);
        const querystring = params ? params.toString() : '';
        const authToken = request.cookies.get('authRe').value;
        const response = await fetch(STRAPI_URL + "/api/users?sort=reviewCreationDate:DESC&sort=id&" + querystring, {
            headers: { Authorization: "Bearer " + authToken },
            cache: "no-store",
        });
        
        const data = await response.json();
        
        if(!data || !data?.length) {
            throw Error
        }
        
        return Response.json({ data })
    } catch (error) {
        return new Response(`Error: ${error.message}`, {
            status: 400,
        })
    }
}