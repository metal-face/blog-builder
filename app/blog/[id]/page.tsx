import React from "react";
import { prisma, BlogPosts } from "@/lib/prisma";
import { TypographyH1 } from "@/components/typography/typography-h1";

export default async function Page({ params }: { params: { id: string } }) {
    const blogPost: BlogPosts | null = await prisma.blogPosts.findFirst({
        where: { id: params.id },
    });

    return (
        <div className="h-4/5 w-full flex flex-col">
            <div className="m-4 text-center">
                <TypographyH1 text={blogPost?.blogTitle ? blogPost.blogTitle : ""} />
            </div>
            <div
                className="w-4/5 h-full overflow-y-auto mx-auto outline p-4 rounded"
                dangerouslySetInnerHTML={{
                    __html: blogPost?.blogPost ? blogPost.blogPost : "",
                }}
            />
        </div>
    );
}
