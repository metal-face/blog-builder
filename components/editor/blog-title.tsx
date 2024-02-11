"use client";

import { TypographyH1 } from "../typography/typography-h1";

interface Props {
    blogTitle: string;
}

export default function BlogTitle({ blogTitle }: Props) {
    return (
        <div className="w-full text-center">
            <TypographyH1 text={blogTitle} />
        </div>
    );
}
