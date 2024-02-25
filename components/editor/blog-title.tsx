"use client";

import { TypographyH1 } from "../typography/typography-h1";
import { TypographyH2 } from "../typography/typography-h2";

interface Props {
    blogTitle: string;
}

export default function BlogTitle({ blogTitle }: Props) {
    return (
        <div className="w-full text-center">
            <TypographyH2 text={blogTitle} />
        </div>
    );
}
