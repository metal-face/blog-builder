"use client";

import { FaGithub, FaLink } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
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
            <LoginButton provider={Providers.LINKEDIN} colorCode="#0077B5">
                <FaLinkedin />
            </LoginButton>
            <LoginButton provider={Providers.TWITCH} colorCode="#9146FF">
                <FaTwitch />
            </LoginButton>
            <LoginButton provider={Providers.TWITTER} colorCode="#1DA1F2">
                <FaTwitter />
            </LoginButton>
        </>
    );
}
