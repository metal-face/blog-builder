"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/blogs/blog-card";
import CustomPagination from "@/components/pagination";
import ResponsiveDialog from "@/components/responsive-dialog";
import { useDeletePost } from "@/functions/blog/delete-post";
import { useUndoDelete } from "@/functions/blog/undo-delete";
import { useFetchAllBlogs } from "@/functions/blogs/fetch-all-blogs";
import type { BlogPosts } from "@/generated/prisma/client";

interface Props {
    initData: BlogPosts[];
    numOfPages: number;
}

export default function BlogCards({ initData, numOfPages }: Props) {
    const [triggerDelete, setTriggerDelete] = useState<boolean>(false);
    const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);
    const [blogIdToDelete, setBlogIdToDelete] = useState<string>("");
    const [page, setPage] = useState<number>(0);

    const { mutate: undoDeletePost, isPending: undoDeletePending } = useUndoDelete({
        setTriggerDelete,
    });

    const { mutate: deletePost, isPending: deletePending } = useDeletePost({
        setTriggerDelete,
        setBlogIdToDelete,
        undoDeleteMutateAsync: undoDeletePost,
    });

    const { data, isFetching: isFetchingBlogs } = useFetchAllBlogs({ page });

    const posts = data?.blogs ?? (page === 0 ? initData : []);
    const numberOfPages = data ? Math.ceil(data.count / 6) : numOfPages;

    useEffect(() => {
        if (triggerDelete && blogIdToDelete) {
            setTriggerDelete(false);
        }
    }, [triggerDelete, blogIdToDelete]);

    const handleDeleteConfirm = () => {
        if (blogIdToDelete) {
            setDialogVisibility(false);
            deletePost(blogIdToDelete);
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
                        loading={undoDeletePending || deletePending || isFetchingBlogs}
                    />
                ))}
            </div>
            <CustomPagination numberOfPages={numberOfPages} setPage={setPage} page={page} />
        </>
    );
}
