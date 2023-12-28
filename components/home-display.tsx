import { TypeographyH1 } from "@/components/typography/typography-h1";
export function HomeDisplay() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <TypeographyH1 props={{ text: "Good Day" }}></TypeographyH1>
    </div>
  );
}
