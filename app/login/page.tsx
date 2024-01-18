import { LoginButtons } from "@/components/login-buttons";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import "@/app/login/style.css";

export default async function Login() {
    return (
        <div className="content flex w-screen items-center justify-center">
            <div className="flex h-fit w-full flex-col justify-center space-y-3  text-center">
                <div className="flex flex-col space-y-0 text-center">
                    <TypographyH1 text="Welcome!" />
                    <TypographyP text="Login to start building your own blogs." />
                </div>
                <LoginButtons />
            </div>
        </div>
    );
}
