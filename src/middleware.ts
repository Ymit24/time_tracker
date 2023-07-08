import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log("Cookies: ", request.cookies.toString());
    const url = request.nextUrl.clone()
    url.pathname = '/auth';
    return NextResponse.redirect(url);
}

export const config = {
    matcher: '/',
};
