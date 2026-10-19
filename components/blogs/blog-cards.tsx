"use client";

import { type ReactElement, useEffect, useState } from "react";
import BlogCard from "@/components/blogs/blog-card";
import CustomPagination from "@/components/pagination";
import ResponsiveDialog from "@/components/responsive-dialog";
import { useDeletePost } from "@/functions/blog/delete-post";
import { useUndoDelete } from "@/functions/blog/undo-delete";
import { useFetchAllBlogs } from "@/functions/blogs/fetch-all-blogs";
import { useFetchPostsCount } from "@/functions/blogs/fetch-count";
import type { BlogPosts } from "@/generated/prisma/client";
import { useIsLoading } from "@/hooks/use-is-loading";

interface Props {
    initData: BlogPosts[];
    numOfPages: number;
}

export default function BlogCards({ initData, numOfPages }: Props) {
    const [fetchData, setFetchData] = useState<boolean>(false);
    const [triggerDelete, setTriggerDelete] = useState<boolean>(false);
    const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState(numOfPages);

    const { mutate: undoDeletePost, isPending: undoDeletePending } = useUndoDelete({
        setTriggerDelete,
        setFetchData,
        blogId: blogIdToDelete,
    });

    const { mutate: deletePost, isPending: deletePending } = useDeletePost({
        blogId: blogIdToDelete,
        setFetchData,
        setTriggerDelete,
        setBlogIdToDelete,
        undoDeleteMutateAsync: undoDeletePost,
    });

    const {
        data: blogs,
        isSuccess: fetchBlogsIsSuccess,
        isFetching: isFetchingBlogs,
    } = useFetchAllBlogs({ fetchData, page });

    const {
        data: count,
        isSuccess: countIsSuccess,
        refetch: refetchCount,
        isFetching: isFetchingCount,
    } = useFetchPostsCount();

    const isLoading = useIsLoading({
        undoDeletePending,
        deletePending,
        isFetchingBlogs,
        isFetchingCount,
    });

    useEffect(() => {
        if (countIsSuccess) {
            setNumberOfPages(Math.ceil(count.count / 6));
        }
    }, [count, countIsSuccess]);

    const InitBlogCards: ReactElement[] = initData.map((blog: BlogPosts) => (
        <BlogCard
            key={blog.id}
            blog={blog}
            setDialogVisibility={setDialogVisibility}
            setBlogIdToDelete={setBlogIdToDelete}
            loading={isLoading}
        />
    ));

    const [blogData, setBlogData] = useState<ReactElement[]>(InitBlogCards);

    useEffect(() => {
        if (fetchBlogsIsSuccess && blogs?.length && blogs?.length > 0) {
            const transformed: ReactElement[] = blogs.map((blog: BlogPosts) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    setDialogVisibility={setDialogVisibility}
                    setBlogIdToDelete={setBlogIdToDelete}
                    loading={isLoading}
                />
            ));

            // TODO: return the count along with the blogs
            refetchCount().then(() => {
                setNumberOfPages(Math.ceil(count.count / 6));
            });

            setBlogData(transformed);
        }
    }, [blogs, fetchBlogsIsSuccess, refetchCount, count, isLoading]);

    useEffect(() => {
        if (triggerDelete && blogIdToDelete) {
            setFetchData(true);
            setTriggerDelete(false);
        }
    }, [triggerDelete, blogIdToDelete]);

    const handleDeleteConfirm = () => {
        if (blogIdToDelete) {
            setDialogVisibility(false);
            deletePost();
            setFetchData(true);
        }
    };

    return (
        <>
            <ResponsiveDialog
                visible={dialogVisibility}
                setVisibility={setDialogVisibility}
                onConfirm={handleDeleteConfirm}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full w-full gap-2 ">
                {blogData}
            </div>
            <CustomPagination
                numberOfPages={numberOfPages}
                setPage={setPage}
                setEnabled={setFetchData}
                page={page}
            />
        </>
    );
}
