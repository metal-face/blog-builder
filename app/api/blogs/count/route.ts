import { prisma } from "@/lib/prisma";
import { auth } from "@/auth/auth";

export async function GET() {
    const session = await auth();

    if (!session) {
        return Response.json({}, { status: 400, statusText: "Bad Request" });
    }

    try {
        const count = await prisma.blogPosts.count({
            where: {
                AND: [
                    {
                        userId: session.user.id,
                    },
                    {
                        deletedAt: null,
                    },
                ],
            },
        });

        if (!count) {
            return Response.json({}, { status: 500, statusText: "Internal Server Error" });
        }

        return Response.json({ count }, { status: 200, statusText: "Success" });
    } catch {
        return Response.error();
    }
}
