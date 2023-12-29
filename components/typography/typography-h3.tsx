"use client";
interface TypographyH3Props {
  props: {
    text: string;
  };
}

export default function TypographyH3({ props }: TypographyH3Props) {
  return (
    <h3 className="m-1 scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.text}
    </h3>
  );
}
