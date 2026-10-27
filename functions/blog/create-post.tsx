import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPost } from "@/axios/blog/create-post";

export function useCreatePost() {
    return useMutation({
        mutationKey: ["createPost"],
        mutationFn: createPost,
        onSuccess: (_data, { isDraft }) => {
            if (isDraft) {
                toast.success("Success! 🎉", {
                    description: "You have successfully saved this post as a draft!",
                });
                return;
            }

            toast.success("You have successfully saved your blog 🚀");
        },
        onError: () => {
            toast.error("Oops 😬", { description: "Something went wrong, please try again!" });
        },
    });
}
