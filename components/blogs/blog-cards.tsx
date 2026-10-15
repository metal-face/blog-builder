"use client";

import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import React, { type ReactElement, useEffect, useState } from "react";
import BlogCard from "@/components/blogs/blog-card";
import CustomPagination from "@/components/pagination";
import ResponsiveDialog from "@/components/responsive-dialog";
import { useDeletePost } from "@/functions/blog/delete-post";
import { useUndoDelete } from "@/functions/blog/undo-delete";
import { useFetchAllBlogs } from "@/functions/blogs/fetch-all-blogs";
import { useFetchPostsCount } from "@/functions/blogs/fetch-count";
import type { BlogPosts } from "@/generated/prisma/client";

interface Props {
    initData: BlogPosts[];
    numOfPages: number;
}

export default function BlogCards({ initData, numOfPages }: Props) {
    const [fetchData, setFetchData] = useState<boolean>(false);
    const [triggerDelete, setTriggerDelete] = useState<boolean>(false);
    const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [enabled, setEnabled] = useState<boolean>(false);
    const [numberOfPages, setNumberOfPages] = useState(numOfPages);
    const queryClient: QueryClient = useQueryClient();

    const { undoDeleteMutation } = useUndoDelete({
        setTriggerDelete,
        setFetchData,
        blogId: blogIdToDelete,
        queryClient,
    });

    // balls
    const { deleteMutation } = useDeletePost({
        blogId: blogIdToDelete,
        setFetchData,
        setTriggerDelete,
        setBlogIdToDelete,
        undoDeleteMutateAsync: undoDeleteMutation.mutateAsync,
        queryClient,
    });

    const { fetchAllQuery } = useFetchAllBlogs({ fetchData, enabled, setEnabled, page });

    const { data, isSuccess } = fetchAllQuery;

    const count = useFetchPostsCount();

    useEffect(() => {
        if (count.isSuccess) {
            setNumberOfPages(Math.ceil(count.data.count / 6));
        }
    }, [count.data, count.isSuccess]);

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
        if (isSuccess && data.length > 0) {
            setEnabled(false);
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

            count.refetch().then((res) => {
                setNumberOfPages(Math.ceil(res.data.count / 6));
            });

            setBlogData(transformed);
            setFetchData(false);
        }
    }, [blogIdToDelete, data, deleteMutation.status, isSuccess, loading, triggerDelete]);

    useEffect(() => {
        if (triggerDelete && blogIdToDelete) {
            setFetchData(true);
            setEnabled(true);
            setTriggerDelete(false);
        }
    }, [triggerDelete, blogIdToDelete]);

    const handleDeleteConfirm = async () => {
        if (blogIdToDelete) {
            setLoading(true);
            setDialogVisibility(false);
            await deleteMutation.mutateAsync();
            setFetchData(true);
            setEnabled(true);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full w-full gap-2 place-content-center">
                {blogData}
            </div>
            <CustomPagination
                numberOfPages={numberOfPages}
                setPage={setPage}
                setEnabled={setEnabled}
                page={page}
            />
        </>
    );
}
