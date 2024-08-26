import { auth } from "@/auth/auth";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { Session } from "next-auth";
import { BlogPosts } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Hammer, Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React, { ReactElement } from "react";
import BlogCards from "@/components/blogs/blog-cards";
import Link from "next/link";

export default async function Page(): Promise<ReactElement> {
    const session: Session | null = await auth();

    if (!session) {
        redirect("/login");
    }

    const numOfBlogs: number = await prisma.blogPosts.count({
        where: {
            AND: [{ userId: session.user.id }, { deletedAt: null }],
        },
    });

    const numOfPages = numOfBlogs / 5;

    const blogs: BlogPosts[] = await prisma.blogPosts.findMany({
        skip: 0,
        take: 6,
        where: { userId: session.user.id, deletedAt: null },
    });

    if (blogs.length === 0) {
        return (
            <div className="h-[85%] w-full sm:w-5/6 lg:w-4/5 mx-auto flex items-center justify-center flex-col ">
                <div className="flex justify-center items-center mb-3">
                    <TypographyH1 text={"Blogs"} />
                </div>
                <div className="mb-4">
                    <TypographyP text={"You currently have no blogs"} />
                </div>
                <Link href={"/builder"}>
                    <Button>
                        Build a Blog <Hammer className="ml-2 w-4 h-4" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full h-[90%] sm:w-5/6 lg:w-4/5 mx-auto flex flex-col justify-center items-center">
            <div
                className={
                    "flex flex-col justify-center items-center w-5/6 sm:w-full h-full sm:h-[90%] md:h-[80%] lg:h-[70%]"
                }
            >
                <BlogCards initData={blogs} numOfPages={numOfPages} />
            </div>
            <div className={"h-fit w-fit m-auto absolute bottom-8 right-8"}>
                <Link href={"/builder"}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className={
                                    "rounded-full m-2 h-24 w-24 bg-green-500 dark:bg-green-400 hover:bg-green-400 dark:hover:bg-green-500 hover:rotate-[360deg] duration-500 ease-in-out transition-all transform-gpu"
                                }
                            >
                                <Pencil className={"w-8 h-8"} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>New Post</span>
                        </TooltipContent>
                    </Tooltip>
                </Link>
            </div>
        </div>
    );
}
