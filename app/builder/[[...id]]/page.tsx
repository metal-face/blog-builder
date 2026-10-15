import type { ReactElement } from "react";
import { auth } from "@/auth/auth";
import BlogBuilder from "@/components/editor/blog-builder";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { prisma } from "@/lib/prisma";

export default async function Page(props: {
    params: Promise<{ id?: string[] }>;
}): Promise<ReactElement> {
    const params = await props.params;
    const session = await auth();

    if (params.id) {
        const blogPost = await prisma.blogPosts.findUnique({
            where: {
                id: params.id.toString(),
                userId: session?.user.id,
            },
        });

        if (!blogPost) {
            return (
                <div className={"h-full w-full flex items-center justify-center"}>
                    <TypographyH1 text={"Oops! Something went wrong"} />
                </div>
            );
        }

        return <BlogBuilder blog={blogPost} />;
    }

    return <BlogBuilder />;
}
