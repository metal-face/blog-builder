import createDOMPurify from "dompurify";
import jsdom from "jsdom";
import type { NextRequest } from "next/server";
import type { Session } from "next-auth";
import { auth } from "@/auth/auth";
import type { BlogPosts } from "@/generated/prisma/client";
import listenForAttributeSanitization from "@/hooks/listen-for-attribute-sanitization";
import listenForElementSanitization from "@/hooks/listen-for-element-sanitization";
import { prisma } from "@/lib/prisma";
import { allowedStyles } from "@/models/allowed-styles";
import type {
    CreatePostPayload,
    CreatePostResponse,
    FetchBlogsResponse,
    PatchPostPayload,
    PatchPostResponse,
    UpdatePostPayload,
    UpdatePostResponse,
} from "@/models/blog-api";

const { JSDOM } = jsdom;
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

interface DeleteData {
    blogId: string;
}

export async function POST(req: Request): Promise<Response> {
    const session: Session | null = await auth();
    const updatedAt: Date = new Date();

    const { blogTitle, blogPost, isDraft, isPrivate, relatedPosts }: CreatePostPayload =
        (await req.json()) as CreatePostPayload;

    if (!session?.user.id) {
        return Response.json({}, { status: 401, statusText: "Unauthorized" });
    }

    const userId = session.user.id;

    if (blogTitle.length < 4 || blogTitle.length > 32) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    if (blogPost.length < 20 || blogPost.length > 20000) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    listenForAttributeSanitization(allowedStyles, DOMPurify);

    listenForElementSanitization(DOMPurify);

    const cleanPost = DOMPurify.sanitize(blogPost, {
        FORBID_TAGS: ["script", "svg"],
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "style"],
    });

    try {
        return await prisma.$transaction(async (tx) => {
            const post = await tx.blogPosts.create({
                data: {
                    blogTitle: blogTitle,
                    blogPost: cleanPost,
                    private: isPrivate,
                    draft: isDraft,
                    userId: userId,
                    updatedAt: updatedAt,
                },
            });

            await tx.relatedBlogPosts.createMany({
                data: relatedPosts.map((id) => ({ relatedBlogId: id, originBlogId: post.id })),
            });

            return Response.json({} satisfies CreatePostResponse, {
                status: 201,
                statusText: "Success",
            });
        });
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
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}

export async function GET(req: NextRequest): Promise<Response> {
    const session: Session | null = await auth();

    const take: string | null = req.nextUrl.searchParams.get("take");
    const page: string | null = req.nextUrl.searchParams.get("page");

    if (!session || !take || !page) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const where = { userId: session.user.id, deletedAt: null };

        const [blogs, count]: [BlogPosts[], number] = await prisma.$transaction([
            prisma.blogPosts.findMany({
                skip: parseInt(page, 10) * parseInt(take, 10),
                take: parseInt(take, 10),
                where,
            }),
            prisma.blogPosts.count({ where }),
        ]);

        return Response.json({ blogs, count } satisfies FetchBlogsResponse);
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}

export async function PUT(req: NextRequest): Promise<Response> {
    const session = await auth();
    const { blogId, blogPost, blogTitle, isDraft, isPrivate }: UpdatePostPayload =
        (await req.json()) as UpdatePostPayload;

    if (!session || !blogId || !blogPost || !blogTitle) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    const cleanedBlogPost = DOMPurify.sanitize(blogPost, {
        FORBID_TAGS: ["script", "svg"],
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "style"],
    });

    listenForAttributeSanitization(allowedStyles, DOMPurify);
    listenForElementSanitization(DOMPurify);

    try {
        const res = await prisma.blogPosts.update({
            where: { id: blogId, userId: session.user.id },
            data: {
                blogTitle: blogTitle,
                blogPost: cleanedBlogPost,
                draft: isDraft,
                private: isPrivate,
            },
        });

        if (!res) {
            return Response.json({}, { status: 500, statusText: "Internal Server Error" });
        }

        return Response.json({ data: res } satisfies UpdatePostResponse, {
            status: 200,
            statusText: "Success",
        });
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}

export async function PATCH(req: NextRequest): Promise<Response> {
    const session: Session | null = await auth();
    const { blogId, revertDelete }: PatchPostPayload = (await req.json()) as PatchPostPayload;

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

        return Response.json({ res } satisfies PatchPostResponse, {
            status: 200,
            statusText: "Success",
        });
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}
