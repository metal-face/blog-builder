import { TypographyH1 } from "@/components/typography/typography-h1";
import React from "react";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export default async function Page() {
    const session = await auth();

    const blogs = await prisma?.blogPosts.findMany({
        where: { userId: session?.user.id },
    });

    blogs.forEach((blog) => {
        console.log(blog);
    });
    return (
        <div className="flex  justify-center h-full w-full">
            <div className="flex items-start">
                <TypographyH1 text="My Blogs"></TypographyH1>
            </div>
        </div>
    );
}
