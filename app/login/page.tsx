import { LoginButtons } from "@/components/login-buttons";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Fragment } from "react";
import "@/app/login/style.css";

// TODO: learn more about why async react components are not groovy for next.js

export default async function Login() {
    return (
        <div className="content flex items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 text-center">
                <div className="flex flex-col space-y-0 text-center">
                    <TypographyH1 text="Welcome!" />
                    <TypographyP text="Login to start building your own blogs." />
                </div>
                <LoginButtons redirectTo="/" />
            </div>
        </div>
    );
}
