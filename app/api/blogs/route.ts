import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type PostData = {
    blogTitle: string;
    blogPost: string;
    userId: string;
};
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { blogTitle, blogPost, userId } = req.body as PostData;
    const updatedAt = new Date();

    try {
        const newPost = await prisma.blogPosts.create({
            data: {
                blogTitle,
                blogPost,
                userId,
                updatedAt
            },
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating post" });
    }
}
