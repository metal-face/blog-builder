import React from "react";
import prisma from "@/lib/prisma";
import { TypographyH1 } from "@/components/typography/typography-h1";

export default async function Page({ params }: { params: { id: string } }) {
    const blogPost = await prisma.blogPosts.findFirst({
        where: { id: params.id },
    });

    console.log(blogPost);
    return (
        <div className="h-full w-full flex flex-col justify-center">
            <div className="m-4 text-center">
                <TypographyH1
                    text={blogPost?.blogTitle ? blogPost.blogTitle : ""}
                />
            </div>
            <div
                className="w-4/5 mx-auto outline p-4 rounded"
                dangerouslySetInnerHTML={{
                    __html: blogPost?.blogPost ? blogPost.blogPost : "",
                }}
            />
        </div>
    );
}
