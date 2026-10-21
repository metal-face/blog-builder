import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import type { UndoDeletePost } from "@/functions/blog/undo-delete";

interface Props {
    setFetchData?: Dispatch<SetStateAction<boolean>>;
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
    setBlogIdToDelete?: Dispatch<SetStateAction<string>>;
    undoDeleteMutateAsync: UndoDeletePost["mutate"];
}

export function useDeletePost({
    setFetchData,
    setTriggerDelete,
    setBlogIdToDelete,
    undoDeleteMutateAsync,
}: Props) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deletePost"],
        mutationFn: async (blogId: string) => {
            return await fetch("/api/blogs", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId: blogId }),
            });
        },
        onSuccess: async (_res, blogId) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] }),
                queryClient.invalidateQueries({ queryKey: ["postCount"] }),
            ]);

            if (setBlogIdToDelete && setTriggerDelete && setFetchData) {
                setTriggerDelete(false);
                setFetchData(true);
            }

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
