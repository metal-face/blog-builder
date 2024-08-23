import { BlogPosts } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import { QueryClient, UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { Undo } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Props {
    blogId?: string;
    setFetchData?: Dispatch<SetStateAction<boolean>>;
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
    setBlogIdToDelete?: Dispatch<SetStateAction<string>>;
    undoDeleteMutateAsync: UseMutateAsyncFunction<Response, Error, void, unknown>;
    queryClient: QueryClient;
}

export function useDeletePost({
    blogId,
    setFetchData,
    setTriggerDelete,
    setBlogIdToDelete,
    undoDeleteMutateAsync,
    queryClient,
}: Props) {
    const { toast } = useToast();

    const deleteMutation = useMutation({
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

    return { deleteMutation };
}
