"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BlogPosts } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import BlogActions from "@/components/blogs/blog-actions";
import Link from "next/link";
import { useUndoDelete } from "@/functions/blog/undo-delete";
import { useDeletePost } from "@/functions/blog/delete-post";

interface Props {
    blog: BlogPosts;
    triggerDelete?: boolean;
    blogIdToDelete?: string;
    setFetchData?: Dispatch<SetStateAction<boolean>>;
    setDialogVisibility?: Dispatch<SetStateAction<boolean>>;
    setBlogIdToDelete?: Dispatch<SetStateAction<string>>;
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
}

export default function BlogCard({
    blog,
    triggerDelete,
    blogIdToDelete,
    setFetchData,
    setDialogVisibility,
    setBlogIdToDelete,
    setTriggerDelete,
}: Props) {
    const { undoDeleteMutateAsync } = useUndoDelete({ setTriggerDelete, setFetchData, blog });

    const { mutateAsync, status } = useDeletePost({
        blog,
        setFetchData,
        setTriggerDelete,
        setBlogIdToDelete,
        undoDeleteMutateAsync,
    });

    useEffect(() => {
        async function triggerDeletePost() {
            if (triggerDelete && blogIdToDelete === blog.id && status === "idle") {
                await mutateAsync();
            }
        }

        triggerDeletePost().then(() => {
            return;
        });
    }, [blog, triggerDelete, blogIdToDelete, mutateAsync, status]);

    return (
        <Link href={`/blog/${blog.id}`}>
            <Card className="hover:outline-1 flex flex-col justify-between h-full group active:scale-100 hover:shadow-md active:shadow-sm active:duration-75 cursor-pointer drop-shadow-3xl  hover:scale-105 transform-gpu transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-left group-hover:underline text-lg sm:text-sm md:text-md lg:text-lg">
                        {blog.blogTitle}
                    </CardTitle>
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

                {setDialogVisibility && setBlogIdToDelete ? (
                    <CardFooter>
                        <BlogActions
                            setDialogVisibility={setDialogVisibility}
                            blogId={blog.id}
                            setBlogIdToDelete={setBlogIdToDelete}
                        />
                    </CardFooter>
                ) : (
                    <></>
                )}
            </Card>
        </Link>
    );
}
