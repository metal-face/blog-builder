import { LoginButton } from "@/components/login-button";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { TypographyP } from "@/components/typography/typography-p";
import { Fragment } from "react";
import "@/app/login/style.css";

export default async function Login() {
    return (
        <Fragment>
            <div className="content flex items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 text-center">
                    <div className="flex flex-col space-y-2 text-center">
                        <TypographyH1 text="Welcome!" />
                        <TypographyP text="Login to start building your own blogs." />
                    </div>
                    <LoginButton redirectTo="/" />
                </div>
            </div>
        </Fragment>
    );
}
