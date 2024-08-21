import { useQuery } from "@tanstack/react-query";

interface Props {
    fetchData: boolean;
}

export function useFetchAllBlogs({ fetchData }: Props) {
    const { status, data, refetch } = useQuery({
        queryKey: ["fetchBlogs"],
        enabled: fetchData,
        queryFn: async () => {
            const res = await fetch("/api/blogs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Unable to fetch blogs");
            }

            return await res.json();
        },
    });

    return { status, data, refetch };
}
