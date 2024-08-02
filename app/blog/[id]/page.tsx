import { prisma, BlogPosts } from "@/lib/prisma";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { ReactElement } from "react";
import Tiptap from "@/components/editor/tip-tap";
import { ViewLog } from "@prisma/client";

interface SearchParams {
    ip: string | undefined;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: SearchParams;
}): Promise<ReactElement> {
    if (searchParams.ip && params.id) {
        const hasViewed = await prisma.viewLog.findFirst({
            where: {
                postId: {
                    contains: params.id,
                },
                ipAddress: {
                    contains: searchParams.ip,
                },
            },
        });

        if (!hasViewed) {
            const viewLog: ViewLog = await prisma.viewLog.create({
                data: {
                    ipAddress: searchParams.ip,
                    postId: params.id,
                },
            });

            const updatedViewCount: BlogPosts = await prisma.blogPosts.update({
                where: {
                    id: params.id,
                },
                data: {
                    pageViews: {
                        increment: 1,
                    },
                },
            });
        }
    }

    const blogPost: BlogPosts | null = await prisma.blogPosts.findFirst({
        where: { id: params.id },
    });

    if (blogPost && blogPost.blogPost && blogPost.blogTitle) {
        return (
            <div className={"h-4/5 w-full sm:w-11/12 mx-auto flex justify-center flex-col"}>
                <div className={"text-center mb-2"}>
                    <TypographyH1 text={blogPost.blogTitle} />
                </div>
                <Tiptap editable={false} blogPost={blogPost.blogPost} />
            </div>
        );
    }
    return (
        <div className="h-4/5 w-full flex justify-center items-center">
            <TypographyH1 text={"Oops! We couldn't find your blog"} />
        </div>
    );
}
