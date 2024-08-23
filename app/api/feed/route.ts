import { BlogPosts } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
    const take = request.nextUrl.searchParams.get("take");
    const page = request.nextUrl.searchParams.get("page");

    if (!take || !page) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
            skip: parseInt(take) * parseInt(page),
            take: parseInt(take),
            where: {
                AND: [
                    {
                        private: false,
                    },
                    {
                        deletedAt: null,
                    },
                ],
            },
        });

        if (blogs) {
            return Response.json({ blogs }, { status: 200, statusText: "Success" });
        }

        return Response.json({}, { status: 404, statusText: "Not Found" });
    } catch (err: any) {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}
