import prisma from "@/lib/prisma";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import type { NextApiRequest, NextApiResponse } from "next";

type PostData = {
    blogTitle: string;
    blogPost: string;
};
export async function POST(req: Request) {
    const session = await auth();
    const { blogTitle, blogPost } = (await req.json()) as PostData;
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
            status: 201,
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error) {
        console.error("Request error", error);
        return new Response(JSON.stringify({}), {
            status: 500,
            statusText: "Internal Server Error",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
