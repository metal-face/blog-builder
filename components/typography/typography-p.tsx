interface TypographyPProps {
    text: string;
}

export function TypographyP({ text }: TypographyPProps) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>;
}
