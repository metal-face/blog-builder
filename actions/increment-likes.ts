"use server";

import { prisma } from "@/lib/prisma";
import { BlogPosts, DislikeLog, LikeLog } from "@prisma/client";

interface ReturnItems {
    updatedLikeCount: number;
    hasToggledDislike: boolean;
    hasLiked: boolean;
}

export async function incrementLike(
    ipAddress: string,
    blogPostId: string,
    userId: string,
    currentLikeCount: number
): Promise<ReturnItems> {
    try {
        const hasLiked: LikeLog | null = await prisma.likeLog.findFirst({
            where: {
                ipAddress: ipAddress,
                postId: blogPostId,
                userId: userId,
            },
        });

        if (hasLiked) {
            return {
                updatedLikeCount: currentLikeCount,
                hasLiked: false,
                hasToggledDislike: false,
            };
        }

        const hasDisliked: DislikeLog | null = await prisma.dislikeLog.findFirst({
            where: {
                ipAddress: ipAddress,
                postId: blogPostId,
                userId: userId,
            },
        });

        if (hasDisliked) {
            await prisma.dislikeLog.delete({
                where: {
                    id: hasDisliked.id,
                },
            });

            const like = await prisma.blogPosts.update({
                where: {
                    id: blogPostId,
                },
                data: { likes: { increment: 1 } },
            });

            return { updatedLikeCount: like.likes, hasLiked: false, hasToggledDislike: true };
        }

        await prisma.likeLog.create({
            data: {
                postId: blogPostId,
                ipAddress: ipAddress,
                userId: userId,
            },
        });

        const increment: BlogPosts = await prisma.blogPosts.update({
            where: {
                id: blogPostId,
            },
            data: {
                likes: { increment: 1 },
            },
        });
        return { updatedLikeCount: increment.likes, hasLiked: true, hasToggledDislike: false };
    } catch (err: any) {
        console.error(err);
    }

    return { updatedLikeCount: currentLikeCount, hasLiked: false, hasToggledDislike: false };
}
