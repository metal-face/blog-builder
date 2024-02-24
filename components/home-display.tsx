import PenCanvas from "@/components/three/pen-canvas";
import { TypographyH2 } from "@/components/typography/typography-h2";

export function HomeDisplay() {
    return (
        <div className="custom-container w-full flex flex-col items-center justify-center">
            <PenCanvas />
            <TypographyH2 text={"The Pen Is Mightier Than The Sword"} />
        </div>
    );
}
