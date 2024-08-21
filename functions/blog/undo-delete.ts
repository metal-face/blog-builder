import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPosts } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

interface Props {
    setFetchData?: Dispatch<SetStateAction<boolean>>;
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
    blog: BlogPosts;
}

export function useUndoDelete({ setFetchData, setTriggerDelete, blog }: Props) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ["undoDeletion"],
        mutationFn: async () => {
            return await fetch("/api/blogs", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId: blog.id, revertDelete: true }),
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });

            if (setFetchData && setTriggerDelete) {
                setFetchData(true);
                setTriggerDelete(false);
            }

            toast({
                title: "Success! 🎉",
                description: "Your deletion has been reverted!",
                className: "bg-[#6cc070]",
            });
        },
        onError: () => {
            toast({
                title: "Oops!",
                description: "Something went wrong!",
                variant: "destructive",
            });
        },
    });

    const undoDeleteMutateAsync = mutateAsync;

    return { undoDeleteMutateAsync };
}
