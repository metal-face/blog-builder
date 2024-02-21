import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "./typography/typography-p";
import TypographyH3 from "./typography/typography-h3";
import ThreeScene from "./three/ThreeScene";
import PenCanvas from "./three/pen-canvas";

export function HomeDisplay() {
    return (
        <div className="custom-container w-full flex flex-col items-center justify-center">
            <PenCanvas />
            {/* <ThreeScene /> */}
            <TypographyH1 text={"the pen is mightier than the sword."} />
            {/* <TypographyH3 text={"Craft your own blogs for free."} /> */}
            {/* <TypographyP text={"Built with ❤️ by MetalFace"} /> */}
        </div>
    );
}
