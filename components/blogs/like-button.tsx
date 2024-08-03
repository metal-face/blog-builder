"use client";

import { incrementLike } from "@/actions/increment-likes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function LikeButton({
    initialLikes,
    blogPostId,
    ipAddress,
    userId,
    hasLiked,
}: {
    initialLikes: number;
    blogPostId: string;
    ipAddress: string;
    userId: string;
    hasLiked: boolean;
}) {
    const [likes, setLikes] = useState(initialLikes);
    const [loading, setLoading] = useState(false);
    const [fill, setFill] = useState(hasLiked ? "yellow" : "");

    return (
        <div className={"flex items-center space-x-0"}>
            <span className={"text-sm"}>{likes}</span>
            <Button
                variant={"link"}
                onClick={async () => {
                    setLoading(true);
                    const updatedLikes = await incrementLike(ipAddress, blogPostId, userId, likes);
                    setLikes(updatedLikes);
                    setLoading(false);
                    setFill("yellow");
                }}
            >
                {loading ? <ReloadIcon className={"mr-2 h-4 w-4 animate-spin"} /> : null}

                <ThumbsUp className={"h-4 w-4"} fill={fill} color={hasLiked ? fill : "white"} />
            </Button>
        </div>
    );
}
