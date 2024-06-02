import { TypographyH1 } from "@/components/typography/typography-h1";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
import prisma from "@/lib/prisma";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

export default async function Page() {
    const session = await auth();

    const blogs = await prisma?.blogPosts.findMany({
        where: { userId: session?.user.id },
    });

    const blogCard = blogs.map((blog) => (
        <Card key={blog.id}>
            <CardHeader>
                <CardTitle className="text-center">{blog.blogTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-right text-sm">
                    {format(blog.createdAt, "PPPP - pp")}
                </p>
            </CardContent>
        </Card>
    ));

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="text-center m-3">
                <TypographyH1 text="My Blogs" />
            </div>
            <div className="space-y-4">{blogCard}</div>
        </div>
    );
}
