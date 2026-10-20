"use client";

import { format } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import BlogActions from "@/components/blogs/blog-actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { BlogPosts } from "@/generated/prisma/client";

interface Props {
    blog: BlogPosts;
    setDialogVisibility?: Dispatch<SetStateAction<boolean>>;
    setBlogIdToDelete?: Dispatch<SetStateAction<string>>;
    loading: boolean;
}

export default function BlogCard({ blog, setDialogVisibility, setBlogIdToDelete, loading }: Props) {
    return (
        <Card className="flex flex-col w-full justify-between h-48 hover:shadow-md drop-shadow-3xl">
            <CardHeader>
                <Link href={`/blog/${blog.id}`}>
                    <CardTitle className="text-left hover:underline text-lg sm:text-sm md:text-md lg:text-lg">
                        {blog.blogTitle}
                    </CardTitle>
                </Link>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={"flex items-center space-x-1 absolute top-4 right-6"}>
                            <Eye className={"h-5 w-5"} />
                            <span className={"text-sm"}>{blog.pageViews.toLocaleString()}</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Blog Views</span>
                    </TooltipContent>
                </Tooltip>
            </CardHeader>
            <CardContent>
                <p className="text-left opacity-60 text-sm sm:text-xs">
                    {format(blog.createdAt, "PPPP")}
                </p>
            </CardContent>

            {setDialogVisibility && setBlogIdToDelete && (
                <CardFooter>
                    <BlogActions
                        setDialogVisibility={setDialogVisibility}
                        blogId={blog.id}
                        setBlogIdToDelete={setBlogIdToDelete}
                        loading={loading}
                    />
                </CardFooter>
            )}
        </Card>
    );
}
