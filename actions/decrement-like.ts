"use server";

import { LikeLog } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface ReturnValues {
    updatedLikeCount: number;
    hasDisliked: boolean;
    hasToggledLike: boolean;
}

export async function decrementLike(
    ipAddress: string,
    userId: string,
    blogPostId: string,
    currentLikeCount: number
): Promise<ReturnValues> {
    try {
        const hasLiked: LikeLog | null = await prisma.likeLog.findFirst({
            where: {
                ipAddress: ipAddress,
                userId: userId,
                postId: blogPostId,
            },
        });

        if (hasLiked) {
            await prisma.likeLog.delete({
                where: {
                    id: hasLiked.id,
                },
            });

            const dislike = await prisma.blogPosts.update({
                where: {
                    id: blogPostId,
                },
                data: {
                    likes: { decrement: 1 },
                },
            });

            return { updatedLikeCount: dislike.likes, hasToggledLike: true, hasDisliked: false };
        }

        const hasDisliked = await prisma.dislikeLog.findFirst({
            where: {
                ipAddress: ipAddress,
                postId: blogPostId,
                userId: userId,
            },
        });

        if (hasDisliked) {
            return {
                updatedLikeCount: currentLikeCount,
                hasToggledLike: false,
                hasDisliked: false,
            };
        }

        await prisma.dislikeLog.create({
            data: {
                ipAddress: ipAddress,
                postId: blogPostId,
                userId: userId,
            },
        });

        const dislike = await prisma.blogPosts.update({
            where: {
                id: blogPostId,
            },
            data: {
                likes: { decrement: 1 },
            },
        });

        return { updatedLikeCount: dislike.likes, hasToggledLike: false, hasDisliked: true };
    } catch (err: any) {
        console.error(err);
    }

    return { updatedLikeCount: currentLikeCount, hasToggledLike: false, hasDisliked: false };
}
