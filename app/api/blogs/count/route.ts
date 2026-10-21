import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";
import type { PostsCountResponse } from "@/models/blog-api";

export async function GET() {
    const session = await auth();

    if (!session) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const count = await prisma.blogPosts.count({
            where: {
                AND: [
                    {
                        userId: session.user.id,
                    },
                    {
                        deletedAt: null,
                    },
                ],
            },
        });

        return Response.json({ count } satisfies PostsCountResponse, {
            status: 200,
            statusText: "Success",
        });
    } catch {
        return Response.error();
    }
}
