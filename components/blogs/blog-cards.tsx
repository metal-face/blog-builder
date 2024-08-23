"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { BlogPosts } from "@prisma/client";
import BlogCard from "@/components/blogs/blog-card";
import ResponsiveDialog from "@/components/responsive-dialog";
import { useFetchAllBlogs } from "@/functions/blogs/fetch-all-blogs";
import { useQueryClient } from "@tanstack/react-query";
import { useUndoDelete } from "@/functions/blog/undo-delete";
import { useDeletePost } from "@/functions/blog/delete-post";

interface Props {
    initData: BlogPosts[];
}

export default function BlogCards({ initData }: Props) {
    const [fetchData, setFetchData] = useState<boolean>(false);
    const [triggerDelete, setTriggerDelete] = useState<boolean>(false);
    const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { undoDeleteMutation } = useUndoDelete({
        setTriggerDelete,
        setFetchData,
        blogId: blogIdToDelete,
        queryClient,
    });

    const { deleteMutation } = useDeletePost({
        blogId: blogIdToDelete,
        setFetchData,
        setTriggerDelete,
        setBlogIdToDelete,
        undoDeleteMutateAsync: undoDeleteMutation.mutateAsync,
        queryClient,
    });

    const { fetchAllQuery } = useFetchAllBlogs({ fetchData });

    const { data, isSuccess } = fetchAllQuery;

    const InitBlogCards: ReactElement[] = initData.map((blog: BlogPosts) => (
        <BlogCard
            key={blog.id}
            blog={blog}
            setDialogVisibility={setDialogVisibility}
            setBlogIdToDelete={setBlogIdToDelete}
            loading={loading}
        />
    ));

    const [blogData, setBlogData] = useState<ReactElement[]>(InitBlogCards);

    useEffect(() => {
        if (isSuccess) {
            const newBlogPosts: BlogPosts[] = data as BlogPosts[];

            const transformed: ReactElement[] = newBlogPosts.map((blog: BlogPosts) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    setDialogVisibility={setDialogVisibility}
                    setBlogIdToDelete={setBlogIdToDelete}
                    loading={loading}
                />
            ));

            setBlogData(transformed);
            setFetchData(false);
        }
    }, [blogIdToDelete, data, deleteMutation.status, isSuccess, triggerDelete]);

    useEffect(() => {
        if (triggerDelete && blogIdToDelete) {
            setFetchData(true);
            setTriggerDelete(false);
        }
    }, [triggerDelete, blogIdToDelete]);

    const handleDeleteConfirm = async () => {
        if (blogIdToDelete) {
            setLoading(true);
            setDialogVisibility(false);
            await deleteMutation.mutateAsync();
            setFetchData(true);
            setLoading(false);
        }
    };

    return (
        <>
            <ResponsiveDialog
                visible={dialogVisibility}
                setVisibility={setDialogVisibility}
                onConfirm={handleDeleteConfirm}
            />
            {blogData}
        </>
    );
}
