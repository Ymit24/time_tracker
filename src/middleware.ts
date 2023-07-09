import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    if (request.cookies.get('token')) {
        console.log('we have a token!');
        return NextResponse.next();
    }
    const url = request.nextUrl.clone()
    console.log('TEST2');
    url.pathname = '/register';
    return NextResponse.redirect(url);
}

export const config = {
    matcher: '/',
};
