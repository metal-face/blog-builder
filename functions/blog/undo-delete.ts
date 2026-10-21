import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { undoDelete } from "@/axios/blog/undo-delete";

interface Props {
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
}

export function useUndoDelete({ setTriggerDelete }: Props) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["undoDeletion"],
        mutationFn: undoDelete,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });

            if (setTriggerDelete) {
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
