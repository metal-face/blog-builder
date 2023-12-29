import { TypographyH1 } from "@/components/typography/typography-h1";
import { Clock } from "@/components/clock";
import TypographyH3 from "./typography/typography-h3";

export function HomeDisplay() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <TypographyH1 props={{ text: "Build Your Own Blogs" }} />

      <TypographyH3 props={{ text: "Built with ❤️ by MetalFace" }} />
      <Clock />
    </div>
  );
}
