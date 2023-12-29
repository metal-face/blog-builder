"use client";
interface TypographyH4Props {
  props: {
    text: string;
  };
}

export function TypographyH4({ props }: TypographyH4Props) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {props.text}
    </h4>
  );
}
