"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface LoginButtonProps {
    provider: Providers;
    colorCode: string;
    children?: React.ReactNode;
}

type State = "error" | "idle" | "pending" | "success";

export enum Providers {
    GITHUB = "github",
    DISCORD = "discord",
    GOOGLE = "google",
}

function providerToSignInWith(provider: Providers) {
    switch (provider) {
        case Providers.GITHUB:
            return "GitHub";
        case Providers.DISCORD:
            return "Discord";
        case Providers.GOOGLE:
            return "Google";
    }
}

export default function LoginButton({ provider, children, colorCode }: LoginButtonProps) {
    const [state, setState] = useState<State>("idle");
    const customClass = { "--color-code": colorCode } as React.CSSProperties;

    async function handleSignIn(provider: Providers) {
        try {
            setState("pending");
            await signIn(provider, { callbackUrl: "/" });
        } catch (error) {
            setState("error");
        }
    }

    return (
        <div
            style={{ ...customClass }}
            className={`login-button h-fit w-64 mx-auto rounded-md duration-300`}
        >
            <Button
                variant="outline"
                size="lg"
                onClick={() => handleSignIn(provider)}
                disabled={state === "pending"}
                className={`${provider} hover:bg-background relative mx-auto flex gap-4 border-none min-w-full`}
            >
                Login with {providerToSignInWith(provider)}
                {children}
            </Button>
        </div>
    );
}
