"use client";
import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function MainNav() {
    return (
        <div className="h-12 flex items-center justify-end">
            <Button variant="outline">
                <Link href="/builder">Build 🛠️</Link>
            </Button>
            <Button variant="outline" className="mx-1">
                Login
                <GitHubLogoIcon className="h-4 w-4 ml-2" />
            </Button>
            <div className="mr-1">
                <ThemeToggle />
            </div>
        </div>
    );
}
