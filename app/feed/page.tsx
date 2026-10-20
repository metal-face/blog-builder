import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { auth } from "@/auth/auth";
import Feed from "@/components/feed/feed";
import type { BlogPosts } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export default async function Page() {
    const session: Session | null = await auth();

    if (!session) {
        redirect("/login");
    }

    const numOfBlogs = await prisma.blogPosts.count({
        where: {
            AND: [{ private: false }, { deletedAt: null }],
        },
    });

    const numOfPages = Math.ceil(numOfBlogs / 6);
    const currentPage = 0;
    const take = 6;

    const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
        skip: take * currentPage,
        take: take,
        where: {
            AND: [
                {
                    private: false,
                },
                {
                    draft: false,
                },
                {
                    deletedAt: null,
                },
            ],
        },
    });

    if (blogs.length === 0) {
        return (
            <div className={"h-full w-full flex justify-center items-center"}>
                <h1>Oops, looks like no blogs</h1>
            </div>
        );
    }

    return (
        <div className={"w-full h-[90%] grid space-y-2"}>
            <Feed numberOfPages={numOfPages} initData={blogs} />
        </div>
    );
}
