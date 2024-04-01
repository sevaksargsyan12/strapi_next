import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {fetchUser} from "@/app/lib/data";

export async function middleware(request: NextRequest) {
    // const cookie = request.cookies.get('authRe');
    
    try {
        const me = await fetchUser();
        // console.log({me})
        const currentPath = request.nextUrl.pathname;
        console.log('middleWare -- >');
        if (currentPath.includes('/dashboard') && !me) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    
        if (currentPath === '/') {
            return me ? NextResponse.redirect(new URL('/dashboard', request.url)) : NextResponse.redirect(new URL('/login', request.url))
        }
    
        if ((currentPath.includes('/login') || currentPath.includes('/register')) && me) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    
        return NextResponse.next()
    } catch (e) {
        console.log('Error Middleware:', e.message);
    }
}