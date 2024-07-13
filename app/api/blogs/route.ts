import { prisma } from "@/lib/prisma";
import { auth } from "@/auth/auth";
import { Session } from "next-auth";
import { BlogPosts } from "@prisma/client";
import { NextRequest } from "next/server";
import DOMPurify from "dompurify";

interface PostData {
    blogTitle: string;
    blogPost: string;
}

interface DeleteData {
    blogId: string;
}

interface PatchData {
    blogId: string;
    revertDelete?: boolean;
}

interface PutPayload {
    blogId: string;
    blogPost: string;
    blogTitle: string;
}

export async function POST(req: Request): Promise<Response> {
    const session: Session | null = await auth();
    const updatedAt: Date = new Date();
    const { blogTitle, blogPost }: PostData = (await req.json()) as PostData;

    if (!session || !session.user.id) {
        return Response.json({}, { status: 401, statusText: "Unauthorized" });
    }

    if (blogTitle.length < 4 || blogTitle.length > 32) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    if (blogPost.length < 20 || blogPost.length > 20000) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    const cleanPost = DOMPurify().sanitize(blogPost, { FORBID_ATTR: ["script", "svg", "style"] });

    try {
        const res = await prisma.blogPosts.create({
            data: {
                blogTitle: blogTitle,
                blogPost: cleanPost,
                userId: session.user.id,
                updatedAt: updatedAt,
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
        const res = await prisma.blogPosts.delete({
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
                deletedAt: null,
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

export async function PUT(req: NextRequest): Promise<Response> {
    const session = await auth();
    const { blogId, blogPost, blogTitle }: PutPayload = (await req.json()) as PutPayload;

    if (!session || !blogId || !blogPost || !blogTitle) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const res = await prisma.blogPosts.update({
            where: { id: blogId, userId: session.user.id },
            data: {
                blogTitle: blogTitle,
                blogPost: blogPost,
            },
        });

        if (!res) {
            return Response.json({}, { status: 500, statusText: "Internal Server Error" });
        }

        return Response.json({ data: res }, { status: 200, statusText: "Success" });
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}

export async function PATCH(req: NextRequest): Promise<Response> {
    const session: Session | null = await auth();
    const { blogId, revertDelete }: PatchData = (await req.json()) as PatchData;

    if (!blogId || !session) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const res = await prisma.blogPosts.update({
            where: {
                id: blogId.toString(),
                userId: session.user.id,
            },
            data: {
                deletedAt: revertDelete ? null : new Date(),
            },
        });

        if (!res) {
            return Response.json({}, { status: 400, statusText: "Bad Request" });
        }

        return Response.json({ res }, { status: 200, statusText: "Success" });
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}
