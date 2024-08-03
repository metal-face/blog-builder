import { prisma, BlogPosts } from "@/lib/prisma";
import { TypographyH1 } from "@/components/typography/typography-h1";
import React, { ReactElement } from "react";
import Tiptap from "@/components/editor/tip-tap";
import LikeButton from "@/components/blogs/like-button";
import { auth } from "@/auth/auth";

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
    const session = await auth();
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
            try {
                await prisma.viewLog.create({
                    data: {
                        ipAddress: searchParams.ip,
                        postId: params.id,
                    },
                });
            } catch (err: any) {
                console.error(err);
            }

            try {
                await prisma.blogPosts.update({
                    where: {
                        id: params.id,
                    },
                    data: {
                        pageViews: {
                            increment: 1,
                        },
                    },
                });
            } catch (err: any) {
                console.error(err);
            }
        }
    }

    const blogPost: BlogPosts | null = await prisma.blogPosts.findFirst({
        where: { id: params.id },
    });

    if (
        blogPost &&
        blogPost.blogPost &&
        blogPost.blogTitle &&
        searchParams.ip &&
        session &&
        session.user.id
    ) {
        const hasLiked = await prisma.likeLog.findFirst({
            where: {
                postId: params.id,
                ipAddress: searchParams.ip,
                userId: session.user.id,
            },
        });
        return (
            <div className={"h-4/5 w-full sm:w-11/12 mx-auto flex justify-center flex-col"}>
                <div className={"text-center mb-2"}>
                    <TypographyH1 text={blogPost.blogTitle} />
                    <LikeButton
                        initialLikes={blogPost.likes}
                        blogPostId={blogPost.id}
                        ipAddress={searchParams.ip}
                        userId={session?.user.id}
                        hasLiked={!!hasLiked}
                    />
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
