import { BlogPosts } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { Undo } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Props {
    blog: BlogPosts;
    setFetchData?: Dispatch<SetStateAction<boolean>>;
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
    setBlogIdToDelete?: Dispatch<SetStateAction<string>>;
    undoDeleteMutateAsync: UseMutateAsyncFunction<Response, Error, void, unknown>;
}

export function useDeletePost({
    blog,
    setFetchData,
    setTriggerDelete,
    setBlogIdToDelete,
    undoDeleteMutateAsync,
}: Props) {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { mutateAsync, status } = useMutation({
        mutationKey: ["deletePost"],
        mutationFn: async () => {
            return await fetch("/api/blogs", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId: blog.id }),
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });

            if (setBlogIdToDelete && setTriggerDelete && setFetchData) {
                setBlogIdToDelete("");
                setTriggerDelete(false);
                setFetchData(true);
            }

            toast({
                title: "Success!",
                description: "You have successfully deleted the blog post!",
                className: "bg-[#6cc070]",
                duration: 2500,
                action: (
                    <ToastAction
                        altText={"Undo"}
                        onClick={async () => {
                            await undoDeleteMutateAsync();
                        }}
                    >
                        Undo <Undo />
                    </ToastAction>
                ),
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

    return { mutateAsync, status };
}
