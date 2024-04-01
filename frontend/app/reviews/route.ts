import {type NextRequest} from 'next/server'
import {flattenAttributes} from "@/app/lib/utils";

const STRAPI_URL = process.env.STRAPI_URL;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const limit = searchParams.get('limit');
        const offset = searchParams.get('start');
        const companyId = searchParams.get('companyId');
        const authToken = request.cookies.get('authRe').value;
        
        const response = await fetch(`${STRAPI_URL}/api/reviews?filters[companyId][$eq]=${companyId}&sort=date:DESC&pagination[start]=${offset}&pagination[limit]=${limit}&sort=id`, {
            headers: {Authorization: "Bearer " + authToken},
            cache: "no-store",
        });
        const data = await response.json();
        
        if (data.error) {
            throw new Error()
        }
        const flattenData = flattenAttributes(data);
        
        return Response.json(flattenData)
    } catch (error) {
        return new Response(`Error: ${error.message}`, {
            status: 400,
        })
    }
    
}