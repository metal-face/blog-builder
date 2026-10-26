import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";
import type { BlogPostInfoResponse } from "@/models/blog-api";

export async function GET(): Promise<Response> {
    const session = await auth();

    if (!session?.user.id) {
        return Response.json(
            {},
            { status: 401, statusText: "You are not authorized to perform this action" }
        );
    }

    const userId = session.user.id;

    try {
        const posts = await prisma.blogPosts.findMany({
            select: {
                id: true,
                blogTitle: true,
            },
            where: {
                userId: userId,
                deletedAt: null,
                private: false,
                draft: false,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return Response.json({ blogPosts: posts } satisfies BlogPostInfoResponse);
    } catch {
        return Response.json({}, { status: 500, statusText: "Failed to fetch blog posts info" });
    }
}
