import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPostDraft } from "@/axios/blog/create-post-draft";

export function useCreatePostDraft() {
    return useMutation({
        mutationKey: ["createPostDraft"],
        mutationFn: createPostDraft,
        onSuccess: () => {
            toast.success("Success! 🎉", {
                description: "You have successfully saved this post as a draft!",
            });
        },
        onError: () => {
            toast.error("Oops 😬", {
                description: "Something went wrong!",
            });
        },
    });
}
