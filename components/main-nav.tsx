"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { EnterIcon } from "@radix-ui/react-icons";
import ConditionalButton from "@/components/conditional-button";
import Link from "next/link";
import dynamic from "next/dynamic";

const Clock = dynamic(() => import("@/components/clock"), { ssr: false });

export function MainNav() {
    const currentPath = usePathname();
    return (
        <div className="h-12 w-full flex justify-between border-b">
            <div className="h-full flex justify-start align-middle">
                <Clock />
            </div>
            <div className="h-full flex items-center">
                <Link href="/builder">
                    <ConditionalButton
                        classes="ml-1"
                        name="Build 🛠️"
                        visible={currentPath !== "/builder"}
                    />
                </Link>
                <Link href="/">
                    <ConditionalButton
                        classes="ml-1"
                        name="Home 🏠"
                        visible={currentPath !== "/"}
                    />
                </Link>
                <Link href="/login">
                    <ConditionalButton
                        classes="ml-1"
                        name="Login"
                        visible={currentPath !== "/login"}
                    >
                        <EnterIcon className="ml-2" />
                    </ConditionalButton>
                </Link>
                <div className="flex align-middle mx-1">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
