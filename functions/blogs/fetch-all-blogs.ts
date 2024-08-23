import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
    fetchData: boolean;
}

export function useFetchAllBlogs({ fetchData }: Props) {
    const [enabled, setEnabled] = useState<boolean>(false);

    useEffect(() => {
        if (fetchData) {
            setEnabled(true);
        }
    }, [setEnabled, fetchData]);

    const fetchAllQuery = useQuery({
        queryKey: ["fetchBlogs"],
        enabled: enabled,
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

    return { fetchAllQuery };
}
