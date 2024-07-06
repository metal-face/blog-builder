import { auth } from "@/app/api/auth/[...nextauth]/route";
import { format } from "date-fns";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "next-auth";
import React, { ReactElement } from "react";
import { prisma, BlogPosts } from "@/lib/prisma";
import Link from "next/link";

export default async function Page(): Promise<ReactElement> {
    const session: Session | null = await auth();

    const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
        where: { userId: session?.user.id },
    });

    const blogCard: ReactElement[] = blogs.map((blog: BlogPosts) => (
        <div
            key={blog.id}
            className={
                "drop-shadow-3xl m-2 hover:scale-110 transform-gpu transition-transform duration-300"
            }
        >
            <Link href={`/blog/${blog.id}`}>
                <Card className="hover:outline-1">
                    <CardHeader>
                        <CardTitle className="text-center hover:underline">
                            {blog.blogTitle}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-sm">{format(blog.createdAt, "PPPP")}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{blogCard}</div>
        </div>
    );
}
