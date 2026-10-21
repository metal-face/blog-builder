import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { undoDelete } from "@/axios/blog/undo-delete";

export function useUndoDelete() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["undoDeletion"],
        mutationFn: undoDelete,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });

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
