import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
    blogId: string;
    blogTitle: string;
    blogPost: string;
    isDraft: boolean;
    isPrivate: boolean;
}

export function useUpdateDraft() {
    return useMutation({
        mutationKey: ["updateDraft"],
        mutationFn: async ({ blogId, blogTitle, blogPost, isDraft, isPrivate }: Props) => {
            const res: Response = await fetch("/api/blogs", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId, blogTitle, blogPost, isDraft, isPrivate }),
            });

            if (!res.ok) {
                throw new Error("Unable to update post");
            }

            return await res.json();
        },
        onSuccess: () => {
            toast.success("Success! 🎉");
        },
        onError: () => {
            toast("Oops! 😬", { description: "Something went wrong!" });
        },
    });
}
