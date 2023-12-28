import { TypeographyH1 } from "@/components/typography/typography-h1";
import { Clock } from "@/components/clock";
export function HomeDisplay() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <TypeographyH1 props={{ text: "Good Day" }}></TypeographyH1>
      <Clock />
    </div>
  );
}
