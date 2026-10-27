import type { Editor } from "@tiptap/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { FaYoutube } from "react-icons/fa";
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

function isYoutubeVideoUrl(value: string): boolean {
    try {
        const url = new URL(value);
        if (url.protocol !== "https:") return false;
        if (url.hostname === "youtu.be") return url.pathname.length > 1;
        return (
            (url.hostname === "youtube.com" || url.hostname === "www.youtube.com") &&
            url.pathname === "/watch" &&
            url.searchParams.has("v")
        );
    } catch {
        return false;
    }
}

export default function YoutubeDialog({ editor }: Props) {
    const [videoUrl, setVideoUrl] = useState<string>("");

    if (!editor) return null;

    function addYoutubeVideo() {
        if (isYoutubeVideoUrl(videoUrl)) {
            editor?.commands.setYoutubeVideo({ src: videoUrl });
        }
        return;
    }

    return (
        <Dialog>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DialogTrigger
                        asChild
                        className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-xl"
                    >
                        <Button variant={"ghost"} size={"sm"}>
                            <FaYoutube />
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
