import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    fetchData: boolean;
    enabled: boolean;
    setEnabled: Dispatch<SetStateAction<boolean>>;
    page: number;
}

export function useFetchAllBlogs({ fetchData, enabled, setEnabled, page }: Props) {
    useEffect(() => {
        if (fetchData) {
            setEnabled(true);
        }
    }, [setEnabled, fetchData]);

    const fetchAllQuery = useQuery({
        queryKey: ["fetchBlogs"],
        enabled: enabled,
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

            return await res.json();
        },
    });

    return { fetchAllQuery };
}
