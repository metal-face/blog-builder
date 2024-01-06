import { TypographyH1 } from "@/components/typography/typography-h1";
import TypographyH3 from "./typography/typography-h3";

export function HomeDisplay() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <TypographyH1 text={"Build Your Own Blogs"} />
            <TypographyH3 text={"Built with ❤️ by MetalFace"} />
        </div>
    );
}
