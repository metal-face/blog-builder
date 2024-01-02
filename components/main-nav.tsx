"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Clock } from "@/components/clock";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ConditionalButtonProps {
    name: string;
    visible: boolean;
}

function ConditionalButton({ name, visible }: ConditionalButtonProps) {
    return visible ? <Button variant="outline">{name}</Button> : <></>;
}

export function MainNav() {
    const currentPath = usePathname();
    return (
        <div className="h-12 w-full flex justify-between border-b">
            <div className="h-full flex justify-start align-middle">
                <Clock />
            </div>
            <div className="h-full flex items-center">
                <Link href="/builder" className="mx-1">
                    <ConditionalButton
                        name="Build 🛠️"
                        visible={currentPath !== "/builder"}
                    />
                </Link>
                <Link href="/">
                    <ConditionalButton
                        name="Home 🏠"
                        visible={currentPath !== "/"}
                    />
                </Link>
                <Button variant="outline" className="mx-1">
                    Login
                    <GitHubLogoIcon className="h-4 w-4 ml-2" />
                </Button>
                <div className="flex align-middle mr-1">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
