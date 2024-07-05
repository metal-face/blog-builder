"use client";
interface TypographyH3Props {
    text: string;
}

export default function TypographyH3({ text }: TypographyH3Props) {
    return <h3 className="m-1 scroll-m-20 text-2xl font-semibold tracking-tight">{text}</h3>;
}
