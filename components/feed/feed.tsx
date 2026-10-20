"use client";

import { useQuery } from "@tanstack/react-query";
import { type ReactElement, useEffect, useState } from "react";
import BlogCard from "@/components/blogs/blog-card";
import CustomPagination from "@/components/pagination";
import type { BlogPosts } from "@/generated/prisma/client";

interface Props {
    numberOfPages: number;
    initData: BlogPosts[];
}

export default function Feed({ numberOfPages, initData }: Props) {
    const [page, setPage] = useState<number>(0);
    const [take, _] = useState<number>(6);

    const { data } = useQuery({
        queryKey: ["paginatedFetchAllFeed", page],
        queryFn: async () => {
            const res = await fetch(`/api/feed?page=${page}&take=${take}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch blogs");
            }

            return await res.json();
        },
    });

    const blogs = initData?.length > 0 ? initData : (data.blogs as BlogPosts[]);

    return (
        <div className={"w-full m-4 h-full flex flex-col"}>
            <div className={"grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"}>
                {blogs.map((blog) => (
                    <div className={"w-full mx-auto m-0 p-0"} key={blog.id}>
                        <BlogCard blog={blog} loading={false} />
                    </div>
                ))}
            </div>
            <CustomPagination numberOfPages={numberOfPages} setPage={setPage} page={page} />
        </div>
    );
}
