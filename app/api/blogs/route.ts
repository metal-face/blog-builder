import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type PostData = {
    blogTitle: string;
    blogPost: string;
    updatedAt: Date;
};
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { blogTitle, blogPost } = req.body as PostData;
    const updatedAt = new Date();

    try {
        const newPost = await prisma.blogPosts.create({
            data: {
                blogTitle,
                blogPost,
                updatedAt,
            },
        });
        res.status(200).json(newPost);
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating post" });
    }
}
