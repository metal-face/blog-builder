import prisma from "@/lib/prisma";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import type { NextApiRequest, NextApiResponse } from "next";

type PostData = {
    blogTitle: string;
    blogPost: string;
    userId: string;
};
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const session = await auth();
    const { blogTitle, blogPost } = req.body as PostData;
    const updatedAt = new Date();

    try {
        if (!session || !session.user.id) {
            return new Response("Not authorized", { status: 401 });
        }
        await prisma.blogPosts.create({
            data: {
                blogTitle,
                blogPost,
                userId: session.user.id,
                updatedAt,
            },
        });
        return new Response(JSON.stringify({}), {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating post" });
    }
}
