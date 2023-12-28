interface TypographyH2Props {
  props: {
    text: string;
  };
}
export function TypographyH2({ props }: TypographyH2Props) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {props.text}
    </h2>
  );
}
