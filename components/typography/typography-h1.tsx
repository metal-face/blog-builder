interface TypographyH1Props {
  props: {
    text: string;
  };
}

export function TypographyH1({ props }: TypographyH1Props) {
  return (
    <h1 className="m-1 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.text}
    </h1>
  );
}
