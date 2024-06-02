import { auth } from "@/app/api/auth/[...nextauth]/route";
import { format } from "date-fns";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Page() {
    const session = await auth();

    const blogs = await prisma?.blogPosts.findMany({
        where: { userId: session?.user.id },
        select: { blogTitle: true, createdAt: true, id: true },
    });

    const blogCard = blogs.map((blog) => (
        <div key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
                <Card className="hover:outline-1">
                    <CardHeader>
                        <CardTitle className="text-center hover:underline">
                            {blog.blogTitle}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-right text-sm">
                            {format(blog.createdAt, "PPPP - pp")}
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </div>
    ));

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="text-center m-3">
                <TypographyH1 text="My Blogs" />
            </div>
            <div className="space-y-3">{blogCard}</div>
        </div>
    );
}
