import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";
import type { BlogPostWithRelatedPosts } from "@/models/blog-api";

export async function GET(_req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await auth();

    if (!session?.user.id) {
        return Response.json({}, { status: 401, statusText: "Unauthorized" });
    }

    const userId = session.user.id;

    if (!params.id) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const res = await prisma.blogPosts.findFirst({
            where: {
                id: params.id,
                userId: userId,
                deletedAt: null,
            },
            include: {
                blogsThisBlogReferences: {
                    select: {
                        relatedBlog: {
                            select: { id: true, blogTitle: true },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                    where: {
                        relatedBlog: { deletedAt: null },
                    },
                },
            },
        });

        if (!res) {
            return Response.json({}, { status: 404, statusText: "Not found" });
        }

        const { blogsThisBlogReferences, ...blog } = res;

        return Response.json(
            {
                data: {
                    ...blog,
                    relatedPosts: blogsThisBlogReferences.map((r) => r.relatedBlog),
                } satisfies BlogPostWithRelatedPosts,
            },
            { status: 200, statusText: "Success" }
        );
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}
