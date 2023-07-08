import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    if (request.cookies.get('token')) {
        return NextResponse.next();
    }
    const url = request.nextUrl.clone()
    url.pathname = '/auth';
    return NextResponse.redirect(url);
}

export const config = {
    matcher: '/',
};
