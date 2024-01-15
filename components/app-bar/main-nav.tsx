import React, { useEffect, useState } from "react";
import ConditionalButton from "@/components/conditional-button";
import Link from "next/link";
import { EnterIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/app-bar/theme-toggle";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import Clock from "@/components/app-bar/clock";

export async function MainNav() {
    const session = await getServerSession(options);
    return (
        <div className="h-12 w-full flex justify-between border-b">
            <div className="h-full flex justify-start align-middle">
                <Clock />
            </div>
            <div className="h-full flex items-center">
                <Link href="/builder">
                    <ConditionalButton
                        classes="ml-1"
                        name="Blog 🛠️"
                        path="/builder"
                    />
                </Link>
                <Link href="/">
                    <ConditionalButton classes="ml-1" name="Home 🏠" path="/" />
                </Link>
                {session ? (
                    <Link href="/api/auth/signin">
                        <ConditionalButton
                            classes="ml-1"
                            name="Login"
                            path="/login"
                        >
                            <EnterIcon className="ml-2" />
                        </ConditionalButton>
                    </Link>
                ) : (
                    <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                )}
                <div className="flex align-middle mx-1">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
