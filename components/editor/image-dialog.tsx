import type { Editor } from "@tiptap/react";
import { Check, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
    editor: Editor | null;
};

export default function ImageDialog({ editor }: Props) {
    const [image, setImage] = useState<string>("");

    if (!editor) return null;
    return (
        <Dialog>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DialogTrigger
                        asChild
                        className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-xl"
                    >
                        <Button size={"sm"} variant={"ghost"}>
                            <ImageIcon />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Add Image</TooltipContent>
            </Tooltip>

            <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Add an Image</DialogTitle>
                    <DialogDescription>
                        Paste a link to an image in the input below.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Input value={image} onChange={(e) => setImage(e.target.value)} />
                    <DialogClose asChild>
                        <Button
                            onClick={() => editor.commands.setImage({ src: image })}
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
