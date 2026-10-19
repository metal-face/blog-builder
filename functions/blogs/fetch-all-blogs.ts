import { useQuery } from "@tanstack/react-query";
import type { BlogPosts } from "@/generated/prisma/client";

interface Props {
    fetchData: boolean;
    page: number;
}

export function useFetchAllBlogs({ fetchData, page }: Props) {
    return useQuery({
        queryKey: ["fetchBlogs"],
        enabled: fetchData,
        queryFn: async () => {
            const res = await fetch(`/api/blogs?take=${6}&page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                return (await res.json()) as BlogPosts[];
            }
        },
    });
}
