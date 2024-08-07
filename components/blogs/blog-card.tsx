"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BlogPosts } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import BlogActions from "@/components/blogs/blog-actions";
import Link from "next/link";
import { Eye, Undo } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

    useEffect(() => {
        async function undoDeletePost(blogId: string) {
            const res = await fetch("/api/blogs", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId: blogId, revertDelete: true }),
            });

            if (res.ok) {
                toast({
                    title: "Success! 🎉",
                    description: "Your deletion has been reverted!",
                    className: "bg-[#6cc070]",
                });
            }

            if (res.status === 400 || res.status === 500) {
                toast({
                    title: "Oops!",
                    description: "Something went wrong!",
                    variant: "destructive",
                });
            }

            if (setFetchData && setTriggerDelete) {
                setFetchData(true);
                setTriggerDelete(false);
            }
        }

        if (triggerDelete && blogIdToDelete === blog.id) {
            const deleteBlogPost = async (): Promise<void> => {
                try {
                    const res = await fetch("/api/blogs", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ blogId: blog.id }),
                    });

                    if (res.ok) {
                        toast({
                            title: "Success!",
                            description: "You have successfully deleted the blog post!",
                            className: "bg-[#6cc070]",
                            duration: 1500,
                            action: (
                                <ToastAction
                                    altText={"Undo"}
                                    onClick={async () => {
                                        await undoDeletePost(blogIdToDelete);
                                    }}
                                >
                                    Undo <Undo />
                                </ToastAction>
                            ),
                        });

                        if (setBlogIdToDelete && setTriggerDelete && setFetchData) {
                            setBlogIdToDelete("");
                            setTriggerDelete(false);
                            setFetchData(true);
                        }
                    }
                } catch (err: any) {
                    console.error(err);
                    toast({
                        title: "Oops!",
                        description: "Something went wrong!",
                        variant: "destructive",
                    });
                }
            };
            deleteBlogPost();
        }
    }, [
        blog,
        toast,
        setFetchData,
        triggerDelete,
        blogIdToDelete,
        setBlogIdToDelete,
        setTriggerDelete,
    ]);

    return (
        <>
            <Card className="hover:outline-1 drop-shadow-3xl m-2 hover:scale-105 transform-gpu transition-transform duration-300">
                <CardHeader>
                    <Link href={`/blog/${blog.id}`}>
                        <CardTitle className="text-center hover:underline">
                            {blog.blogTitle}
                        </CardTitle>
                    </Link>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={"flex items-center space-x-1 absolute top-1 left-5"}>
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
                    <p className="text-center text-sm">{format(blog.createdAt, "PPPP")}</p>
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
        </>
    );
}
