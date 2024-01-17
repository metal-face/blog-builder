"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GitHubLogo from "./icons/github";

type State = "error" | "idle" | "pending" | "success";

export function LoginButton({ redirectTo }: { redirectTo: string }) {
    const [state, setState] = useState<State>("idle");

    async function handleSignIn(provider: string) {
        try {
            setState("pending");
            await signIn(provider, { callbackUrl: redirectTo });
        } catch (error) {
            setState("error");
        }
    }

    return (
        <>
            <div className="mx-auto rounded-md duration-300 hover:shadow-[0_0_2rem_-0.5rem_#c63131]">
                <Button
                    variant="outline"
                    onClick={() => handleSignIn("github")}
                    disabled={state === "pending"}
                    className="fancy-border-gradient hover:bg-background relative mx-auto flex gap-4 border-none"
                >
                    Login with GitHub <GitHubLogo />
                </Button>
            </div>
            <div className="mx-auto rounded-md duration-300 hover:shadow-[0_0_2rem_-0.5rem_#c63131]">
                <Button
                    variant="outline"
                    onClick={() => handleSignIn("google")}
                    disabled={state === "pending"}
                    className="fancy-border-gradient hover:bg-background relative mx-auto flex gap-4 border-none"
                >
                    Login with Google <GitHubLogo />
                </Button>
            </div>
        </>
    );
}
