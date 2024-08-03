import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: "/blog/:id*",
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const ip: string = request.headers.get("x-forwarded-for") || "";
    const { nextUrl: url } = request;

    url.searchParams.set("ip", ip);

    return NextResponse.rewrite(url);
}
