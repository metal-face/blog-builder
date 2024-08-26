import { useQuery } from "@tanstack/react-query";

export function useFetchPostsCount() {
    return useQuery({
        queryKey: ["postCount"],
        queryFn: async () => {
            const res = await fetch("/api/blogs/count", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch count.");
            }

            return await res.json();
        },
    });
}
