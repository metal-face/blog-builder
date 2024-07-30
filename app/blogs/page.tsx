import { auth } from "@/auth/auth";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { Session } from "next-auth";
import { BlogPosts } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { TypographyP } from "@/components/typography/typography-p";
import { Button } from "@/components/ui/button";
import { Hammer, Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import React, { ReactElement } from "react";
import BlogCards from "@/components/blogs/blog-cards";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
            <div className="h-[85%] w-full sm:w-5/6 lg:w-4/5 mx-auto flex items-center justify-center flex-col ">
                <div className={"flex justify-center items-center"}>
                    <TypographyH1 text={"Blogs"} />
                </div>
                <div className={"mb-2"}>
                    <TypographyP text={"You currently have no blogs"} />
                </div>
                <Link href={"/builder"}>
                    <Button>
                        Build a Blog <Hammer />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="h-full w-full sm:w-5/6 lg:w-4/5 mx-auto flex flex-col items-center">
                <div className="text-center m-3">
                    <TypographyH1 text="My Blogs" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
                    <BlogCards initData={blogs} />
                </div>
            </div>
            <div className={"sticky h-fit w-fit bottom-5 left-full mr-8"}>
                <Link href={"/builder"}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className={
                                    "rounded-full h-24 w-24 bg-green-400 hover:bg-green-400 hover:rotate-[360deg] duration-500 ease-in-out transition-transform transform-gpu"
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
        </>
    );
}
