import { prisma } from "@/lib/prisma";
import { auth } from "@/auth/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const session = await auth();

    if (!params.id || !session) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const res = await prisma.blogPosts.findFirst({
            where: {
                id: params.id,
                userId: session.user.id,
                deletedAt: null,
            },
        });

        if (!res) {
            return Response.json({}, { status: 400, statusText: "Bad Request" });
        }

        return Response.json({ data: res }, { status: 200, statusText: "Success" });
    } catch {
        return Response.json({}, { status: 500, statusText: "Internal Server Error" });
    }
}
