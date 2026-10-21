import { useQuery } from "@tanstack/react-query";
import type { BlogPosts } from "@/generated/prisma/client";

interface Props {
    fetchData: boolean;
    page: number;
}

export function useFetchAllBlogs({ fetchData, page }: Props) {
    return useQuery({
        queryKey: ["fetchBlogs", page],
        enabled: fetchData || page > 0,
        queryFn: async () => {
            const res = await fetch(`/api/blogs?take=${6}&page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Unable to fetch blogs");
            }

            return (await res.json()) as BlogPosts[];
        },
    });
}
