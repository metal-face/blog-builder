"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import LoginButton, { Providers } from "@/components/login/login-button";

export function LoginButtons() {
    return (
        <>
            <LoginButton provider={Providers.GITHUB} colorCode="#b1d6fb">
                <FaGithub />
            </LoginButton>
            <LoginButton provider={Providers.GOOGLE} colorCode="#fbbc05">
                <FaGoogle />
            </LoginButton>
        </>
    );
}
