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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Check } from "lucide-react";

type Props = {
    editor: Editor | null;
};

export default function LinkDialog({ editor }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"sm"} className="mx-1">
                    <Link />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Link</DialogTitle>
                    <DialogDescription>
                        Paste a link into the input below!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Input />
                    <DialogClose asChild>
                        <Button variant={"outline"}>
                            <Check />
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
