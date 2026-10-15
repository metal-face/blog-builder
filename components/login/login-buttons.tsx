"use client";

import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import LoginButton, { Providers } from "@/components/login/login-button";

export function LoginButtons() {
    return (
        <>
            <LoginButton provider={Providers.GITHUB} colorCode="#b1d6fb">
                <FaGithub />
            </LoginButton>
            <LoginButton provider={Providers.DISCORD} colorCode="#1DA1F2">
                <FaDiscord />
            </LoginButton>
            <LoginButton provider={Providers.GOOGLE} colorCode="#fbbc05">
                <FaGoogle />
            </LoginButton>
        </>
    );
}
