import type { NextRequest } from "next/server";
import type { BlogPosts } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { FeedResponse } from "@/models/blog-api";

export async function GET(request: NextRequest): Promise<Response> {
    const take = request.nextUrl.searchParams.get("take");
    const page = request.nextUrl.searchParams.get("page");

    if (!take || !page) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
            skip: parseInt(take, 10) * parseInt(page, 10),
            take: parseInt(take, 10),
            where: {
                AND: [
                    {
                        private: false,
                    },
                    {
                        draft: false,
                    },
                    {
                        deletedAt: null,
                    },
                ],
            },
        });

        if (blogs) {
            return Response.json({ blogs } satisfies FeedResponse, {
                status: 200,
                statusText: "Success",
            });
        }

        return Response.json({}, { status: 404, statusText: "Not Found" });
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}
