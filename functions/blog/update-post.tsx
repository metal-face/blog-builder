import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePost } from "@/axios/blog/update-post";

export function useUpdatePost() {
    return useMutation({
        mutationKey: ["updatePost"],
        mutationFn: updatePost,
        onSuccess: () => {
            toast.success("Success 🎉", {
                description: "You have successfully updated your blog 🚀",
            });
        },
        onError: () => {
            toast.error("Oops 😬", {
                description: "Something went wrong!",
            });
        },
    });
}
