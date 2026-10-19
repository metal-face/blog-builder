import { Pencil, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
    blogId: string;
    setDialogVisibility: Dispatch<SetStateAction<boolean>>;
    setBlogIdToDelete: Dispatch<SetStateAction<string>>;
}

export default function BlogActions({ blogId, setDialogVisibility, setBlogIdToDelete }: Props) {
    const router = useRouter();
    return (
        <div className={"gap-2 flex w-full items-center justify-end"}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(`/builder/${blogId}`);
                        }}
                        size={"icon"}
                        className={"cursor-pointer"}
                        variant={"secondary"}
                    >
                        <Pencil />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Update</span>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setBlogIdToDelete(blogId);
                            setDialogVisibility(true);
                        }}
                        size={"icon"}
                        className={"cursor-pointer"}
                        variant={"destructive"}
                    >
                        <TrashIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Delete</span>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
