import { useQuery } from "@tanstack/react-query";
import { fetchAllBlogs } from "@/axios/blogs/fetch-all-blogs";

interface Props {
    fetchData: boolean;
    page: number;
}

export function useFetchAllBlogs({ fetchData, page }: Props) {
    return useQuery({
        queryKey: ["fetchBlogs", page],
        enabled: fetchData || page > 0,
        queryFn: () => fetchAllBlogs({ page, take: 6 }),
    });
}
