"use client";

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { Providers } from "@/components/login/login-button";
import LoginButton from "@/components/login/login-button";

export function LoginButtons() {
    return (
        <>
            <LoginButton provider={Providers.GITHUB} colorCode="#b1d6fb">
                <FaGithub />
            </LoginButton>
            <LoginButton provider={Providers.DISCORD} colorCode={"#1DA1F2"}>
                <FaDiscord />
            </LoginButton>
            <LoginButton provider={Providers.GOOGLE} colorCode="#fbbc05">
                <FaGoogle />
            </LoginButton>
        </>
    );
}
