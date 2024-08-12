import { Editor } from "@tiptap/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Check } from "lucide-react";
import { useState } from "react";

type Props = {
    editor: Editor | null;
};

export default function LinkDialog({ editor }: Props) {
    const [input, setInput] = useState<string>("");

    if (!editor) return null;

    return (
        <Dialog>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DialogTrigger
                        asChild
                        className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-xl"
                    >
                        <Button variant={"ghost"} size={"sm"}>
                            <Link />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Add Link</TooltipContent>
            </Tooltip>
            <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Add a Link</DialogTitle>
                    <DialogDescription>Paste a link into the input below!</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    <DialogClose asChild>
                        <Button
                            onClick={() =>
                                editor.commands.toggleLink({
                                    href: input,
                                    target: "_blank",
                                })
                            }
                            variant={"outline"}
                        >
                            <Check />
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
