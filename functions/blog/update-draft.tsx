import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

interface Props {
    blogId: string;
    blogTitle: string;
    blogPost: string;
    isDraft: boolean;
    isPrivate: boolean;
}

export function useUpdateDraft() {
    const { toast } = useToast();

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
            toast({
                title: "Success! 🎉",
                description: "Successfully updated the draft!",
            });
        },
        onError: () => {
            toast({
                title: "Oops! 😬",
                description: "Something went wrong!",
                variant: "destructive",
            });
        },
    });
}
