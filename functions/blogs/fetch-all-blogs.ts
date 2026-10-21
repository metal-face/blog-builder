import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllBlogs } from "@/axios/blogs/fetch-all-blogs";

interface Props {
    page: number;
}

export function useFetchAllBlogs({ page }: Props) {
    return useQuery({
        queryKey: ["fetchBlogs", page],
        queryFn: () => fetchAllBlogs({ page, take: 6 }),
        // Keep the last page's blogs and count while the next page loads.
        placeholderData: keepPreviousData,
    });
}
