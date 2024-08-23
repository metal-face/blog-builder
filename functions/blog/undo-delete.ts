import { Dispatch, SetStateAction } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

interface Props {
    setFetchData?: Dispatch<SetStateAction<boolean>>;
    setTriggerDelete?: Dispatch<SetStateAction<boolean>>;
    blogId?: string;
    queryClient: QueryClient;
}

export function useUndoDelete({ setFetchData, setTriggerDelete, blogId, queryClient }: Props) {
    const { toast } = useToast();

    const undoDeleteMutation = useMutation({
        mutationKey: ["undoDeletion", blogId],
        mutationFn: async () => {
            return await fetch("/api/blogs", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blogId: blogId, revertDelete: true }),
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });

            if (setFetchData && setTriggerDelete) {
                setFetchData(true);
                setTriggerDelete(false);
            }

            toast({
                title: "Success! 🎉",
                description: "Your deletion has been reverted!",
                className: "bg-[#6cc070]",
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

    return { undoDeleteMutation };
}
