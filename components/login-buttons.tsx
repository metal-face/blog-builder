"use client";

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Providers } from "@/components/login/login-button";
import LoginButton from "@/components/login/login-button";

export function LoginButtons({ redirectTo }: { redirectTo: string }) {
    return (
        <>
            <LoginButton
                provider={Providers.GITHUB}
                colorCode="#b1d6fb"
                redirectTo={redirectTo}
            >
                <FaGithub />
            </LoginButton>
            <LoginButton
                provider={Providers.TWITTER}
                colorCode="#1DA1F2"
                redirectTo={redirectTo}
            >
                <FaTwitter />
            </LoginButton>
            <LoginButton
                provider={Providers.DISCORD}
                colorCode={"#1DA1F2"}
                redirectTo={redirectTo}
            >
                <FaDiscord />
            </LoginButton>
            <LoginButton
                provider={Providers.GOOGLE}
                colorCode="#fbbc05"
                redirectTo={redirectTo}
            >
                <FaGoogle />
            </LoginButton>
        </>
    );
}
