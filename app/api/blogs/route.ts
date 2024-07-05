import prisma from "@/lib/prisma";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

type PostData = {
    blogTitle: string;
    blogPost: string;
};

export async function POST(req: Request): Promise<Response> {
    const session: Session | null = await auth();
    const { blogTitle, blogPost }: PostData = (await req.json()) as PostData;
    const updatedAt: Date = new Date();

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
        return Response.json(
            {},
            { status: 500, statusText: "Internal Server Error" }
        );
    }
}
