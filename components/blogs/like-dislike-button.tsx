"use client";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { incrementLike } from "@/app/actions/increment-likes";
import { decrementLike } from "@/app/actions/decrement-like";
import { determineDislikeFill, determineLikeFill } from "@/lib/helpers";
import React, { useState } from "react";

interface Props {
    initialLikes: number;
    blogPostId: string;
    ipAddress: string;
    userId: string;
    likeStatus: boolean;
    dislikeStatus: boolean;
}

export default function LikeDislikeButton({
    initialLikes,
    blogPostId,
    ipAddress,
    userId,
    likeStatus,
    dislikeStatus,
}: Props) {
    const [likes, setLikes] = useState<number>(initialLikes);
    const [loading, setLoading] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(likeStatus);
    const [disliked, setDisliked] = useState<boolean>(dislikeStatus);
    const [likeFill, setLikeFill] = useState<string>(liked ? "red" : "transparent");
    const [dislikeFill, setDislikeFill] = useState<string>(disliked ? "red" : "transparent");

    return (
        <div className={"flex items-center space-x-0"}>
            <Button
                variant={"link"}
                disabled={liked || loading}
                onClick={async () => {
                    setLoading(true);
                    const { updatedLikeCount, hasLiked, hasToggledDislike } = await incrementLike(
                        ipAddress,
                        blogPostId,
                        userId,
                        likes
                    );
                    setLikes(updatedLikeCount);
                    setLoading(false);
                    determineLikeFill({
                        hasLiked,
                        hasToggledDislike,
                        setLiked,
                        setLikeFill,
                        setDisliked,
                        setDislikeFill,
                    });
                }}
            >
                {loading ? <ReloadIcon className={"mr-2 h-4 w-4 animate-spin"} /> : null}

                <ThumbsUp className={"h-4 w-4"} fill={likeFill} color={liked ? likeFill : "grey"} />
            </Button>
            <Tooltip>
                <TooltipTrigger>
                    <span className={"text-sm"}>{likes}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Total Likes</span>
                </TooltipContent>
            </Tooltip>
            <Button
                variant={"link"}
                disabled={disliked || loading}
                onClick={async () => {
                    setLoading(true);
                    const { updatedLikeCount, hasToggledLike, hasDisliked } = await decrementLike(
                        ipAddress,
                        userId,
                        blogPostId,
                        likes
                    );
                    setLikes(updatedLikeCount);
                    setLoading(false);
                    determineDislikeFill({
                        hasDisliked,
                        hasToggledLike,
                        setLiked,
                        setLikeFill,
                        setDislikeFill,
                        setDisliked,
                    });
                }}
            >
                <ThumbsDown
                    className={"h-4 w-4"}
                    fill={dislikeFill}
                    color={disliked ? dislikeFill : "grey"}
                />
            </Button>
        </div>
    );
}
