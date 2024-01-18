"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface LoginButtonProps {
    provider: Providers;
    redirectTo: string;
    colorCode: string;
    children?: React.ReactNode;
}

export enum Providers {
    GITHUB = "github",
    TWITTER = "twitter",
    DISCORD = "discord",
    GOOGLE = "google",
}

function providerToSignInWith(provider: Providers) {
    switch (provider) {
        case Providers.GITHUB:
            return "GitHub";
        case Providers.TWITTER:
            return "Twitter";
        case Providers.DISCORD:
            return "Discord";
        case Providers.GOOGLE:
            return "Google";
    }
}

type State = "error" | "idle" | "pending" | "success";

export default function LoginButton({
    provider,
    children,
    colorCode,
    redirectTo,
}: LoginButtonProps) {
    const [state, setState] = useState<State>("idle");
    async function handleSignIn(provider: Providers) {
        try {
            setState("pending");
            await signIn(provider, { callbackUrl: redirectTo });
        } catch (error) {
            setState("error");
        }
    }

    return (
        <div
            className={`h-fit  mx-auto rounded-md duration-300 hover:shadow-[0_0_2rem_-0.5rem_${colorCode}]`}
        >
            <Button
                variant="outline"
                size="lg"
                onClick={() => handleSignIn(provider)}
                disabled={state === "pending"}
                className={`${provider} hover:bg-background relative mx-auto flex gap-4 border-none`}
            >
                Login with {providerToSignInWith(provider)}
                {children}
            </Button>
        </div>
    );
}
