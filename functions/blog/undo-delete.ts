import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { undoDelete } from "@/axios/blog/undo-delete";

interface Props {
    setFetchData?: Dispatch<SetStateAction<boolean>>;
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
}

export function useUndoDelete({ setFetchData, setTriggerDelete }: Props) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["undoDeletion"],
        mutationFn: undoDelete,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] }),
                queryClient.invalidateQueries({ queryKey: ["postCount"] }),
            ]);

            if (setFetchData && setTriggerDelete) {
                setFetchData(true);
                setTriggerDelete(false);
            }

            toast.success("Success! 🎉", {
                description: "Your deletion has been reverted!",
            });
        },
        onError: () => {
            toast.error("Oops 😬", {
                description: "Something went wrong!",
            });
        },
    });
}

export type UndoDeletePost = ReturnType<typeof useUndoDelete>;
