import { auth } from "@/app/api/auth/[...nextauth]/route";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { Session } from "next-auth";
import { BlogPosts } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";
import { redirect } from "next/navigation";
import React, { ReactElement } from "react";
import BlogCards from "@/components/blogs/blog-cards";
import Link from "next/link";

export default async function Page(): Promise<ReactElement> {
    const session: Session | null = await auth();

    if (!session) {
        redirect("/login");
    }

    const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
        where: { userId: session.user.id, deletedAt: null },
    });

    if (blogs.length === 0) {
        return (
            <div className="h-full w-full sm:w-5/6 lg:w-4/5 mx-auto flex flex-col items-center">
                <div className="text-center m-3">
                    <TypographyH1 text="My Blogs" />
                </div>
                <div>
                    <TypographyP text={"You currently have no blogs"} />
                    <Link href={"/builder"}>
                        <Button>
                            Build a Blog <Hammer />
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

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
