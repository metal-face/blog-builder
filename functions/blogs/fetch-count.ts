import { useQuery } from "@tanstack/react-query";
import { fetchPostsCount } from "@/axios/blogs/fetch-count";

export function useFetchPostsCount() {
    return useQuery({
        queryKey: ["postCount"],
        queryFn: fetchPostsCount,
    });
}
