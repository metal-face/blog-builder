"use server";

import { prisma } from "@/lib/prisma";
import { BlogPosts } from "@prisma/client";

export async function incrementLike(
    ipAddress: string,
    blogPostId: string,
    userId: string,
    currentLikeCount: number
): Promise<number> {
    const hasLiked = await prisma.likeLog.findFirst({
        where: {
            ipAddress: ipAddress,
            postId: blogPostId,
            userId: userId,
        },
    });

    console.log({ liked: hasLiked });

    if (!hasLiked) {
        try {
            await prisma.likeLog.create({
                data: {
                    postId: blogPostId,
                    ipAddress: ipAddress,
                    userId: userId,
                },
            });
        } catch (err: any) {
            console.log(err);
        }

        try {
            const increment: BlogPosts = await prisma.blogPosts.update({
                where: {
                    id: blogPostId,
                },
                data: {
                    likes: { increment: 1 },
                },
            });
            return increment.likes;
        } catch (err) {
            console.error(err);
        }
    }
    return currentLikeCount;
}
