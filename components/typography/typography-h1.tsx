interface TypeographyH1Props {
  props: {
    text: string;
  };
}

export function TypeographyH1({ props }: TypeographyH1Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.text}
    </h1>
  );
}
