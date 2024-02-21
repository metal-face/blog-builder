import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

type PostData = {
    blogTitle: string;
    blogPost: string;
    userId: string;
};
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions);
    const { blogTitle, blogPost, userId } = req.body as PostData;
    const updatedAt = new Date();

    console.log(session);

    try {
        // @ts-ignore
        if (!session?.user?.id) {
            return new Response("Not authorized", { status: 401 });
        }
        const newPost = await prisma.blogPosts.create({
            data: {
                blogTitle,
                blogPost,
                // @ts-ignore
                userId: session?.user.id,
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
