import { useEffect, useState } from "react";

interface Props {
    undoDeletePending: boolean;
    deletePending: boolean;
    isFetchingBlogs: boolean;
    isFetchingCount: boolean;
}

export const useIsLoading = ({
    undoDeletePending,
    deletePending,
    isFetchingBlogs,
    isFetchingCount,
}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (undoDeletePending || deletePending || isFetchingBlogs || isFetchingCount) {
            setLoading(true);
        }
    }, [undoDeletePending, deletePending, isFetchingBlogs, isFetchingCount]);

    return loading;
};
