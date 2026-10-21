import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateDraft } from "@/axios/blog/update-draft";

export function useUpdateDraft() {
    return useMutation({
        mutationKey: ["updateDraft"],
        mutationFn: updateDraft,
        onSuccess: () => {
            toast.success("Success! 🎉");
        },
        onError: () => {
            toast.error("Oops! 😬", { description: "Something went wrong!" });
        },
    });
}
