import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePost } from "@/axios/blog/delete-post";
import type { UndoDeletePost } from "@/functions/blog/undo-delete";

interface Props {
    undoDeleteMutateAsync: UndoDeletePost["mutate"];
}

export function useDeletePost({ undoDeleteMutateAsync }: Props) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deletePost"],
        mutationFn: deletePost,
        onSuccess: async (_res, blogId) => {
            await queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });

            toast.success("Success 🎉️", {
                description: "Your post has been deleted, to undo click the button below.",
                action: {
                    label: "Undo",
                    onClick: () => undoDeleteMutateAsync(blogId),
                },
            });
        },
        onError: () => {
            toast.error("Oops 😬", {
                description: "Something went wrong!",
            });
        },
    });
}
