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
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube, Check } from "lucide-react";
import { useState } from "react";

type Props = {
    editor: Editor | null;
};

export default function YoutubeDialog({ editor }: Props) {
    const [videoUrl, setVideoUrl] = useState<string>("");

    if (!editor) return null;

    function addYoutubeVideo() {
        if (
            videoUrl.includes("https://youtu.be") ||
            videoUrl.includes("https://youtube.com/watch?v=")
        ) {
            editor?.commands.setYoutubeVideo({ src: videoUrl });
        }
        return;
    }

    return (
        <Dialog>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button variant={"ghost"} size={"sm"} className="ml-1">
                            <Youtube />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Add YouTube</TooltipContent>
            </Tooltip>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a YouTube Video</DialogTitle>
                    <DialogDescription>
                        Paste a YouTube link below to add a video!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Input
                        value={videoUrl}
                        onChange={(e) => {
                            setVideoUrl(e.target.value);
                        }}
                    />
                    <DialogClose asChild>
                        <Button onClick={addYoutubeVideo} variant={"outline"}>
                            <Check />
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
