import { ThemeToggle } from "@/components/app-bar/theme-toggle";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { Hammer, Home, LogIn, Scroll } from "lucide-react";

import React from "react";
import ConditionalButton from "@/components/app-bar/conditional-button";
import Link from "next/link";
import ProfileCard from "@/components/app-bar/profile-card";
import Clock from "@/components/app-bar/clock";
import { Variants } from "@/models/variants";

export async function MainNav() {
    const session = await auth();

    return (
        <div className="h-20 sticky top-0 z-40 inset-x-0 backdrop-blur transition-colors duration-500 lg:border-b lg:border-slate-900/10 dark:border-slate-50[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent w-full  border-b ">
            <div className="py-4 h-full flex justify-between items-center border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 px-4">
                <div className="h-full flex justify-start align-middle">
                    <Clock />
                </div>
                <div className="h-full flex space-x-2 items-center">
                    {session ? (
                        <div>
                            <Link href="/blogs">
                                <ConditionalButton
                                    classes="ml-1 p-0"
                                    name="Blogs"
                                    path="/blogs"
                                    variant={Variants.LINK}
                                >
                                    <Scroll className="scale-75 ml-1" />
                                </ConditionalButton>
                            </Link>
                        </div>
                    ) : null}

                    {session ? (
                        <div>
                            <Link href="/builder">
                                <ConditionalButton
                                    classes="ml-1 p-0"
                                    name="Builder"
                                    path="/builder"
                                    variant={Variants.LINK}
                                >
                                    <Hammer className="scale-75 ml-1" />
                                </ConditionalButton>
                            </Link>
                        </div>
                    ) : null}

                    <div>
                        <Link href="/">
                            <ConditionalButton
                                variant={Variants.LINK}
                                classes="ml-1 p-0"
                                name="Home"
                                path="/"
                            >
                                <Home className="ml-1 scale-75" />
                            </ConditionalButton>
                        </Link>
                    </div>

                    <div className="flex align-middle mx-1">
                        <ThemeToggle />
                    </div>

                    {!session ? (
                        <div>
                            <Link href="/login">
                                <ConditionalButton
                                    variant={Variants.LINK}
                                    classes="ml-1 p-0"
                                    name="Login"
                                    path="/login"
                                >
                                    <LogIn className="ml-1 scale-75" />
                                </ConditionalButton>
                            </Link>
                        </div>
                    ) : null}

                    {session ? <ProfileCard session={session} /> : null}
                </div>
            </div>
        </div>
    );
}
