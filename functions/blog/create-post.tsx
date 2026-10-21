import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
    blogTitle: string;
    blogPost: string;
    isDraft: boolean;
    isPrivate: boolean;
}

export function useCreatePost() {
    return useMutation({
        mutationKey: ["createPost"],
        mutationFn: async ({ blogTitle, blogPost, isDraft, isPrivate }: Props) => {
            const res: Response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogTitle: blogTitle,
                    blogPost: blogPost,
                    isDraft: isDraft,
                    isPrivate: isPrivate,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create post.");
            }

            return await res.json();
        },
        onSuccess: () => {
            toast.success("You have successfully saved your blog 🚀");
        },
        onError: () => {
            toast.error("Oops 😬", { description: "Something went wrong, please try again!" });
        },
    });
}
