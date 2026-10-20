"use client";

import { useEffect, useState } from "react";
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

    const { data: blogs, isFetching: isFetchingBlogs } = useFetchAllBlogs({ fetchData, page });

    const {
        data: count,
        isSuccess: countIsSuccess,
        isFetching: isFetchingCount,
    } = useFetchPostsCount();

    useEffect(() => {
        if (countIsSuccess) {
            setNumberOfPages(Math.ceil(count.count / 6));
        }
    }, [count, countIsSuccess]);

    const posts = blogs ?? (page === 0 ? initData : []);

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
                {posts.map((blog: BlogPosts) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        setDialogVisibility={setDialogVisibility}
                        setBlogIdToDelete={setBlogIdToDelete}
                        loading={
                            undoDeletePending || deletePending || isFetchingBlogs || isFetchingCount
                        }
                    />
                ))}
            </div>
            <CustomPagination numberOfPages={numberOfPages} setPage={setPage} page={page} />
        </>
    );
}
