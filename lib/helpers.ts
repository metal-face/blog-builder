import { Dispatch, SetStateAction } from "react";

interface LikeProps {
    hasLiked: boolean;
    hasToggledDislike: boolean;
    setLiked: Dispatch<SetStateAction<boolean>>;
    setLikeFill: Dispatch<SetStateAction<string>>;
    setDislikeFill: Dispatch<SetStateAction<string>>;
    setDisliked: Dispatch<SetStateAction<boolean>>;
}

interface DislikeProps {
    hasDisliked: boolean;
    hasToggledLike: boolean;
    setLiked: Dispatch<SetStateAction<boolean>>;
    setLikeFill: Dispatch<SetStateAction<string>>;
    setDislikeFill: Dispatch<SetStateAction<string>>;
    setDisliked: Dispatch<SetStateAction<boolean>>;
}

export function determineLikeFill({
    hasLiked,
    hasToggledDislike,
    setLiked,
    setLikeFill,
    setDislikeFill,
    setDisliked,
}: LikeProps): void {
    if (hasLiked && !hasToggledDislike) {
        setLiked(true);
        setLikeFill("red");
    }

    if (hasToggledDislike && !hasLiked) {
        setDislikeFill("transparent");
        setDisliked(false);
    }
}

export function determineDislikeFill({
    hasDisliked,
    hasToggledLike,
    setLiked,
    setLikeFill,
    setDislikeFill,
    setDisliked,
}: DislikeProps): void {
    if (hasDisliked && !hasToggledLike) {
        setDislikeFill("red");
        setDisliked(true);
    }

    if (hasToggledLike && !hasDisliked) {
        setLikeFill("transparent");
        setLiked(false);
    }
}
