import { LoginButtons } from "@/components/login/login-buttons";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import "@/app/login/style.css";

export default function Login() {
    return (
        <div className="flex custom-container w-full flex-col justify-center space-y-3 text-center relative">
            <div className="fixed inset-0 w-full h-full bg-dots [mask-image:radial-gradient(ellipse_at_center,red_30%,transparent)] animate-fadein" />
            <div className="h-fit animate-fadeinscale w-fit -translate-y-12 px-8 sm:px-24 py-12 rounded-3xl bg-white dark:bg-gradient-to-br from-zinc-900 to-black border border-neutral-800 backdrop-blur shadow-lg m-auto flex flex-col gap-4">
                {/* style={{
                    backgroundImage: "url('/noise.webp')",
                }} */}
                <div className="flex flex-col space-y-4 mb-2 text-center">
                    <TypographyH1 text="Welcome!" />
                    <div className="w-[20ch] text-balance mx-auto opacity-60">
                        <TypographyP text="Login to start building your own blogs." />
                    </div>
                </div>
                <LoginButtons />
            </div>
        </div>
    );
}
