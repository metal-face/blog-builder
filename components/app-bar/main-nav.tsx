import { ThemeToggle } from "@/components/app-bar/theme-toggle";
import { auth } from "@/auth/auth";
import { Hammer, Home, LogIn, Rss, Scroll } from "lucide-react";
import { Variants } from "@/models/variants";
import { Session } from "next-auth";
import ConditionalButton from "@/components/app-bar/conditional-button";
import ProfileCard from "@/components/app-bar/profile-card";
import React, { ReactElement } from "react";
import dynamic from "next/dynamic";

const Clock = dynamic(() => import("@/components/app-bar/clock"), { ssr: false });

export async function MainNav(): Promise<ReactElement> {
    const session: Session | null = await auth();

    return (
        <div className="h-20 sticky top-0 z-40 inset-x-0 backdrop-blur transition-colors duration-500 lg:border-b lg:border-slate-900/10 dark:border-slate-50[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent w-full  border-b ">
            <div className="py-4 h-full flex justify-between items-center border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 px-4">
                <div className="h-full flex justify-start align-middle">
                    <Clock />
                </div>
                <div className="h-full flex items-center gap-2">
                    <ConditionalButton
                        variant={Variants.LINK}
                        classes="p-0"
                        name="Home"
                        path="/"
                        visible={true}
                    >
                        <Home className="ml-1 scale-75" />
                    </ConditionalButton>

                    <ConditionalButton
                        classes="p-0"
                        name="Blogs"
                        path="/blogs"
                        variant={Variants.LINK}
                        visible={!!session}
                    >
                        <Scroll className="scale-75 ml-1" />
                    </ConditionalButton>

                    <ConditionalButton
                        classes="p-0"
                        name="Builder"
                        path="/builder"
                        variant={Variants.LINK}
                        visible={!!session}
                    >
                        <Hammer className="scale-75 ml-1" />
                    </ConditionalButton>

                    <ConditionalButton
                        name={"Feed"}
                        path={"/feed"}
                        classes={"p-0"}
                        variant={Variants.LINK}
                        visible={!!session}
                    >
                        <Rss className={"ml-1 scale-75"} />
                    </ConditionalButton>

                    <div>
                        <ThemeToggle />
                    </div>

                    <ConditionalButton
                        variant={Variants.LINK}
                        classes="p-0"
                        name="Login"
                        path="/login"
                        visible={!session}
                    >
                        <LogIn className="ml-1 scale-75" />
                    </ConditionalButton>

                    {session ? (
                        <div>
                            <ProfileCard session={session} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
