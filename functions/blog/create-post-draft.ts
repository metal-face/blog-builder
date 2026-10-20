import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
    blogTitle: string;
    blogPost: string;
    isDraft: boolean;
    isPrivate: boolean;
}

export function useCreatePostDraft() {
    return useMutation({
        mutationKey: ["createPostDraft"],
        mutationFn: async ({ blogTitle, blogPost, isDraft, isPrivate }: Props) => {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogTitle, blogPost, isDraft, isPrivate }),
            });

            if (!res.ok) {
                throw new Error("Unable to create draft");
            }

            return await res.json();
        },
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
