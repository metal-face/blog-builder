import type { ReactElement } from "react";
import { auth } from "@/auth/auth";
import BlogBuilder from "@/components/editor/blog-builder";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { prisma } from "@/lib/prisma";
import type { BlogPostWithRelatedPosts } from "@/models/blog-api";

export default async function Page(props: {
    params: Promise<{ id?: string[] }>;
}): Promise<ReactElement> {
    const params = await props.params;
    const session = await auth();

    if (!params.id) {
        return <BlogBuilder />;
    }

    const res = await prisma.blogPosts.findUnique({
        where: {
            id: params.id.toString(),
            userId: session?.user.id,
        },
        include: {
            blogsThisBlogReferences: {
                select: { relatedBlog: { select: { id: true, blogTitle: true } } },
                where: { relatedBlog: { deletedAt: null } },
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!res) {
        return (
            <div className={"h-full w-full flex items-center justify-center"}>
                <TypographyH1 text={"Oops! Something went wrong"} />
            </div>
        );
    }

    const { blogsThisBlogReferences, ...blog } = res;

    const blogPost: BlogPostWithRelatedPosts = {
        ...blog,
        relatedPosts: blogsThisBlogReferences.map((r) => r.relatedBlog),
    };

    return <BlogBuilder blog={blogPost} />;
}
