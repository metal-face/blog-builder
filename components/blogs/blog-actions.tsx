import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, TrashIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

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
                        onClick={() => {
                            setBlogIdToDelete(blogId);
                            setDialogVisibility(true);
                        }}
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <TrashIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Delete</span>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={() => {
                            router.push(`/builder/${blogId}`);
                        }}
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <Pencil />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Update</span>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
