import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { BlogPosts } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import BlogActions from "@/components/blogs/blog-actions";
import ResponsiveDialog from "@/components/responsive-dialog";
import Link from "next/link";

interface Props {
    blog: BlogPosts;
    triggerDelete: boolean;
    blogIdToDelete: string;
    setFetchData: Dispatch<SetStateAction<boolean>>;
    setDialogVisibility: Dispatch<SetStateAction<boolean>>;
    setBlogIdToDelete: Dispatch<SetStateAction<string>>;
}

export default function BlogCard({
    blog,
    triggerDelete,
    blogIdToDelete,
    setFetchData,
    setDialogVisibility,
    setBlogIdToDelete,
}: Props) {
    const { toast } = useToast();

    useEffect(() => {
        if (triggerDelete && blogIdToDelete === blog.id) {
            const deleteBlogPost = async (): Promise<void> => {
                try {
                    const res = await fetch("/api/blogs", {
                        method: "DELETE",
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
                        });

                        setBlogIdToDelete("");
                        setFetchData(true);
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
    }, [blog, toast, setFetchData, triggerDelete, blogIdToDelete, setBlogIdToDelete]);

    return (
        <>
            <Card className="hover:outline-1 drop-shadow-3xl m-2 hover:scale-105 transform-gpu transition-transform duration-300">
                <CardHeader>
                    <Link href={`/blog/${blog.id}`}>
                        <CardTitle className="text-center hover:underline">
                            {blog.blogTitle}
                        </CardTitle>
                    </Link>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-sm">{format(blog.createdAt, "PPPP")}</p>
                </CardContent>
                <CardFooter>
                    <BlogActions
                        setDialogVisibility={setDialogVisibility}
                        blogId={blog.id}
                        setBlogIdToDelete={setBlogIdToDelete}
                    />
                </CardFooter>
            </Card>
        </>
    );
}