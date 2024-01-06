import { TypographyH1 } from "@/components/typography/typography-h1";
import TypographyH3 from "./typography/typography-h3";
import { TypographyP } from "./typography/typography-p";

export function HomeDisplay() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <TypographyH1 text={"Blog Builder"} />
            <TypographyH3 text={"Craft your own blogs for free."} />
            <TypographyP text={"Built with ❤️ by MetalFace"} />
        </div>
    );
}
