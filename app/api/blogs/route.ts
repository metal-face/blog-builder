import { prisma } from "@/lib/prisma";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import { BlogPosts } from "@prisma/client";
import { NextRequest } from "next/server";

interface PostData {
    blogTitle: string;
    blogPost: string;
}

interface DeleteData {
    blogId: string;
}

export async function POST(req: Request): Promise<Response> {
    const session: Session | null = await auth();
    const updatedAt: Date = new Date();
    const { blogTitle, blogPost }: PostData = (await req.json()) as PostData;

    try {
        if (!session || !session.user.id) {
            return new Response("Not authorized", { status: 401 });
        }

        const res = await prisma.blogPosts.create({
            data: {
                blogTitle,
                blogPost,
                userId: session.user.id,
                updatedAt,
            },
        });

        if (res) {
            return Response.json({}, { status: 201, statusText: "Success" });
        }

        return Response.json({}, { status: 400, statusText: "Bad Request" });
    } catch (error) {
        console.error("Request error", error);
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}

export async function DELETE(req: Request): Promise<Response> {
    const session = await auth();
    const payload: DeleteData = (await req.json()) as DeleteData;
    const blogId = payload.blogId;

    if (!blogId || !session) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const res = await prisma.blogPosts.deleteMany({
            where: { id: blogId, userId: session.user.id },
        });

        if (res) {
            return Response.json({}, { status: 200, statusText: "Success" });
        }

        return Response.json({}, { status: 404, statusText: "Not Found" });
    } catch (err: any) {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}

export async function GET(req: NextRequest): Promise<Response> {
    const session: Session | null = await auth();

    if (!session) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const posts: BlogPosts[] = await prisma.blogPosts.findMany({
            where: {
                userId: session.user.id,
            },
        });

        if (!posts) {
            return Response.json({}, { status: 404, statusText: "Not Found" });
        }

        return Response.json(posts);
    } catch (err: any) {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}
