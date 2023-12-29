interface TypographyH2Props {
  text: string;
}
export function TypographyH2({ text }: TypographyH2Props) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  );
}
