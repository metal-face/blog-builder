import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import type { UndoDeletePost } from "@/functions/blog/undo-delete";

interface Props {
    blogId?: string;
    setFetchData?: Dispatch<SetStateAction<boolean>>;
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
    setBlogIdToDelete?: Dispatch<SetStateAction<string>>;
    undoDeleteMutateAsync: UndoDeletePost["mutate"];
}

export function useDeletePost({
    blogId,
    setFetchData,
    setTriggerDelete,
    setBlogIdToDelete,
    undoDeleteMutateAsync,
}: Props) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deletePost", blogId],
        mutationFn: async () => {
            return await fetch("/api/blogs", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId: blogId }),
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });

            if (setBlogIdToDelete && setTriggerDelete && setFetchData) {
                setTriggerDelete(false);
                setFetchData(true);
            }

            toast.success("Success 🎉️", {
                description: "Your post has been deleted, to undo click the button below.",
                action: {
                    label: "Undo",
                    onClick: async () => {
                        undoDeleteMutateAsync();
                        await queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });
                    },
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
