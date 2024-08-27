import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

interface Props {
    blogId: string;
    blogTitle: string;
    blogPost: string;
    isDraft: boolean;
    isPrivate: boolean;
}

export function useUpdatePost() {
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["updatePost"],
        mutationFn: async ({ blogId, blogTitle, blogPost, isDraft, isPrivate }: Props) => {
            const res: Response = await fetch("/api/blogs", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogId: blogId,
                    blogPost: blogPost,
                    blogTitle: blogTitle,
                    isDraft: isDraft,
                    isPrivate: isPrivate,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update post.");
            }

            return await res.json();
        },
        onSuccess: () => {
            toast({
                title: "Success!",
                description: "You have successfully saved your blog 🚀",
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
}
