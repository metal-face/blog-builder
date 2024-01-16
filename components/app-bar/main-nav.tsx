import React, { useEffect, useState } from "react";
import ConditionalButton from "@/components/conditional-button";
import Link from "next/link";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/app-bar/theme-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Clock from "@/components/app-bar/clock";

export async function MainNav() {
    const session = await getServerSession(authOptions);
    console.log(session);
    return (
        <div className=" sticky top-0 z-40 inset-x-0 backdrop-blur transition-colors duration-500 lg:border-b lg:border-slate-900/10 dark:border-slate-50[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent w-full no-flex border-b ">
            <div className="py-4  border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 px-4">
                <div className="relative flex justify-between items-center">
                    <div className="h-full flex justify-start align-middle">
                        <Clock />
                    </div>
                    <div className="h-full flex items-center">
                        {session ? (
                            <Link href="/builder">
                                <ConditionalButton
                                    classes="ml-1"
                                    name="Blog 🛠️"
                                    path="/builder"
                                />
                            </Link>
                        ) : null}
                        <Link href="/">
                            <ConditionalButton
                                classes="ml-1"
                                name="Home 🏠"
                                path="/"
                            />
                        </Link>
                        {!session ? (
                            <Link href="/login">
                                <ConditionalButton
                                    classes="ml-1"
                                    name="Login"
                                    path="/login"
                                >
                                    <EnterIcon className="ml-2" />
                                </ConditionalButton>
                            </Link>
                        ) : (
                            <Link href="/api/auth/signout?callbackUrl=/">
                                <ConditionalButton
                                    classes="ml-1 text-red-700 hover:text-red-500"
                                    name="Logout"
                                    path="/api/auth/signout?callbackUrl=/"
                                >
                                    <ExitIcon className="ml-2" />
                                </ConditionalButton>
                            </Link>
                        )}
                        <div className="flex align-middle mx-1">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
