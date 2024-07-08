import { auth } from "@/app/api/auth/[...nextauth]/route";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { Session } from "next-auth";
import { BlogPosts } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import React, { ReactElement } from "react";
import BlogCards from "@/components/blogs/blog-cards";

export default async function Page(): Promise<ReactElement> {
    const session: Session | null = await auth();

    const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
        where: { userId: session?.user.id, deletedAt: null },
    });

    return (
        <div className="h-full w-full sm:w-5/6 lg:w-4/5 mx-auto flex flex-col items-center">
            <div className="text-center m-3">
                <TypographyH1 text="My Blogs" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
                <BlogCards initData={blogs} />
            </div>
        </div>
    );
}
