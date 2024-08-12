import PenCanvas from "@/components/three/pen-canvas";
import { TypographyH1 } from "@/components/typography/typography-h1";

export function HomeDisplay() {
    return (
        <div className="custom-container w-full flex flex-col items-center justify-center bg-[url('/noise.webp'),linear-gradient(to_top_right,_var(--tw-gradient-stops))] dark:from-zinc-900 dark:to-zinc-950 -mt-20 min-h-screen from-stone-400 to-yellow-50 relative overflow-hidden">
            <div className="bg-grid absolute -inset-96 w-[200%] h-[200%] rotate-6" />
            <PenCanvas />
            <div className="absolute text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-serif w-[60ch] text-balance drop-shadow-lg text-black dark:text-yellow-500 saturate-50">
                <TypographyH1 text={"The pen is mightier than the sword."} />
            </div>
        </div>
    );
}
