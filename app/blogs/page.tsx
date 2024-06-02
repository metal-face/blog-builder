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

export default async function Page() {
    const session = await auth();

    const blogs = await prisma?.blogPosts.findMany({
        where: { userId: session?.user.id },
    });

    const BlogCards = blogs.map((blog) => (
        <Card key={blog.id}>
            <CardHeader>
                <CardTitle>{blog.blogTitle}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
        </Card>
    ));

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="text-center m-3">
                <TypographyH1 text="My Blogs" />
            </div>
            <div className="space-y-4">{BlogCards}</div>
        </div>
    );
}
