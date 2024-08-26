"use client";

import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BlogPosts } from "@prisma/client";
import CustomPagination from "@/components/pagination";
import BlogCard from "@/components/blogs/blog-card";

interface Props {
    numberOfPages: number;
    initData: BlogPosts[];
}

export default function Feed({ numberOfPages, initData }: Props) {
    const transformed = initData.map((blog) => (
        <div className={"w-full mx-auto m-0 p-0"} key={blog.id}>
            <BlogCard blog={blog} />
        </div>
    ));

    const [page, setPage] = useState<number>(0);
    const [take, setTake] = useState<number>(6);
    const [blogData, setBlogData] = useState<ReactElement[]>(transformed);
    const [enabled, setEnabled] = useState<boolean>(false);

    const { data, isSuccess } = useQuery({
        queryKey: ["paginatedFetchAllFeed", page],
        enabled: enabled,
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

    useEffect(() => {
        if (isSuccess && data) {
            const payload = data.blogs as BlogPosts[];
            const transformed = payload.map((blog) => (
                <div className={"w-full mx-auto m-0 p-0"} key={blog.id}>
                    <BlogCard blog={blog} />
                </div>
            ));

            setBlogData(transformed);
        }
    }, [data, isSuccess]);

    if (blogData.length > 0) {
        return (
            <div className={"w-full space-y-2 h-full flex flex-col justify-center"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full w-full gap-2 place-content-center">
                    {blogData}
                </div>

                <CustomPagination
                    numberOfPages={numberOfPages}
                    setPage={setPage}
                    setEnabled={setEnabled}
                    page={page}
                />
            </div>
        );
    }
}
