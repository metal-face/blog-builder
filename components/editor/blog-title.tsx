"use client";

import { TypographyH2 } from "@/components/typography/typography-h2";

interface Props {
    blogTitle: string;
}

export default function BlogTitle({ blogTitle }: Props) {
    return (
        <div className="w-full text-center flex justify-center items-center">
            <TypographyH2 text={blogTitle} />
        </div>
    );
}
