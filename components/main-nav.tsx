"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import GitHubLogo from "@/components/icons/github";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const Clock = dynamic(() => import("@/components/clock"), { ssr: false });

interface ConditionalButtonProps {
    name: string;
    visible: boolean;
}

function ConditionalButton({ name, visible }: ConditionalButtonProps) {
    return visible ? <Button variant="outline">{name}</Button> : null;
}

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
                        name="Build 🛠️"
                        visible={currentPath !== "/builder"}
                    />
                </Link>
                <Link href="/" className="ml-1">
                    <ConditionalButton
                        name="Home 🏠"
                        visible={currentPath !== "/"}
                    />
                </Link>
                <Link href="/login">
                    <Button variant="outline" className="mx-1">
                        Login
                        <GitHubLogo classes={"ml-2"} />
                    </Button>
                </Link>
                <div className="flex align-middle mr-1">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
