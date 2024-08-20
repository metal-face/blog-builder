"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BlogPosts } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Eye, Undo } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import BlogActions from "@/components/blogs/blog-actions";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

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
    const { toast } = useToast();

    const undoDeleteMutation = useMutation({
        mutationKey: ["undoDeletion"],
        mutationFn: async () => {
            return await fetch("/api/blogs", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId: blog.id, revertDelete: true }),
            });
        },
        onSuccess: () => {
            if (setFetchData && setTriggerDelete) {
                setFetchData(true);
                setTriggerDelete(false);
            }
            toast({
                title: "Success! 🎉",
                description: "Your deletion has been reverted!",
                className: "bg-[#6cc070]",
            });
        },
        onError: () => {
            toast({
                title: "Oops!",
                description: "Something went wrong!",
                variant: "destructive",
            });
        },
    });

    const deleteMutation = useMutation({
        mutationKey: ["deletePost"],
        mutationFn: async () => {
            return await fetch("/api/blogs", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId: blog.id }),
            });
        },
        onSuccess: () => {
            if (setBlogIdToDelete && setTriggerDelete && setFetchData) {
                setBlogIdToDelete("");
                setTriggerDelete(false);
                setFetchData(true);
            }
            toast({
                title: "Success!",
                description: "You have successfully deleted the blog post!",
                className: "bg-[#6cc070]",
                duration: 2500,
                action: (
                    <ToastAction
                        altText={"Undo"}
                        onClick={async () => {
                            await undoDeleteMutation.mutateAsync();
                        }}
                    >
                        Undo <Undo />
                    </ToastAction>
                ),
            });
        },
        onError: () => {
            toast({
                title: "Oops!",
                description: "Something went wrong!",
                variant: "destructive",
            });
        },
    });

    useEffect(() => {
        async function triggerDeletePost() {
            if (triggerDelete && blogIdToDelete === blog.id && deleteMutation.status === "idle") {
                await deleteMutation.mutateAsync();
            }
        }

        triggerDeletePost().then(() => {
            return;
        });
    }, [deleteMutation, blog, triggerDelete, blogIdToDelete]);

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
