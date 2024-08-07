import { prisma, BlogPosts } from "@/lib/prisma";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { auth } from "@/auth/auth";
import { DislikeLog, LikeLog, ViewLog } from "@prisma/client";
import { Session } from "next-auth";
import React, { ReactElement } from "react";
import Tiptap from "@/components/editor/tip-tap";
import LikeDislikeButton from "@/components/blogs/like-dislike-button";

interface SearchParams {
    ip: string | undefined;
}

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: SearchParams;
}): Promise<ReactElement> {
    const session: Session | null = await auth();

    if (searchParams.ip && params.id) {
        try {
            const hasViewed: ViewLog | null = await prisma.viewLog.findFirst({
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
                await prisma.viewLog.create({
                    data: {
                        ipAddress: searchParams.ip,
                        postId: params.id,
                    },
                });

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
            }
        } catch (err: any) {
            console.error(err);
        }
    }

    const blogPost: BlogPosts | null = await prisma.blogPosts.findFirst({
        where: { id: params.id },
    });

    if (blogPost && blogPost.blogPost && blogPost.blogTitle && searchParams.ip) {
        let hasLiked: LikeLog | null = null;
        let hasDisliked: DislikeLog | null = null;

        hasLiked = await prisma.likeLog.findFirst({
            where: {
                postId: params.id,
                ipAddress: searchParams.ip,
                userId: session?.user.id,
            },
        });

        if (!hasLiked) {
            hasDisliked = await prisma.dislikeLog.findFirst({
                where: {
                    ipAddress: searchParams.ip,
                    postId: params.id,
                    userId: session?.user.id,
                },
            });
        }

        return (
            <div className={"h-4/5 w-full sm:w-11/12 mx-auto flex justify-center flex-col"}>
                <div className={"text-center mb-2"}>
                    <TypographyH1 text={blogPost.blogTitle} />

                    {session ? (
                        <div className={"flex justify-end items-center"}>
                            <LikeDislikeButton
                                initialLikes={blogPost.likes}
                                blogPostId={blogPost.id}
                                ipAddress={searchParams.ip}
                                userId={session?.user.id || ""}
                                likeStatus={!!hasLiked}
                                dislikeStatus={!!hasDisliked}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
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
