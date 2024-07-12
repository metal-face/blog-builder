"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { BlogPosts } from "@prisma/client";
import BlogCard from "@/components/blogs/blog-card";
import ResponsiveDialog from "@/components/responsive-dialog";

interface Props {
    initData: BlogPosts[];
}

export default function BlogCards({ initData }: Props) {
    const [fetchData, setFetchData] = useState<boolean>(false);
    const [triggerDelete, setTriggerDelete] = useState<boolean>(false);
    const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState<string>("");

    const InitBlogCards: ReactElement[] = initData.map((blog: BlogPosts) => (
        <BlogCard
            key={blog.id}
            blog={blog}
            blogIdToDelete={blogIdToDelete}
            setFetchData={setFetchData}
            triggerDelete={triggerDelete}
            setDialogVisibility={setDialogVisibility}
            setBlogIdToDelete={setBlogIdToDelete}
            setTriggerDelete={setTriggerDelete}
        />
    ));

    const [data, setData] = useState<ReactElement[]>(InitBlogCards);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            const res = await fetch("/api/blogs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                const payload = await res.json();

                const newBlogPosts: BlogPosts[] = payload as BlogPosts[];

                const transformed: ReactElement[] = newBlogPosts.map((blog: BlogPosts) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        blogIdToDelete={blogIdToDelete}
                        setFetchData={setFetchData}
                        triggerDelete={triggerDelete}
                        setDialogVisibility={setDialogVisibility}
                        setBlogIdToDelete={setBlogIdToDelete}
                        setTriggerDelete={setTriggerDelete}
                    />
                ));

                setData(transformed);
                setFetchData(false);
            }
        };

        fetchAllBlogs();
    }, [fetchData, triggerDelete, blogIdToDelete]);

    return (
        <>
            <ResponsiveDialog
                visible={dialogVisibility}
                setVisibility={setDialogVisibility}
                setTriggerDelete={setTriggerDelete}
            />
            {data}
        </>
    );
}
