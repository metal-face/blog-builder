"use client";

import * as React from "react";
import { Sun, Moon, Cpu } from "lucide-react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { setTheme, theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    function determineTheme(): string | undefined {
        switch (theme) {
            case "system":
                return systemTheme;
            case "light":
                return theme;
            case "dark":
                return theme;
            default:
                break;
        }
    }

    if (!mounted) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="default" className="p-0">
                    Theme
                    {determineTheme() === "light" ? (
                        <Sun className="ml-1 scale-75" />
                    ) : (
                        <Moon className="dark:visible ml-1 dark:scale-75" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                        checked={theme === "light"}
                        onCheckedChange={() => setTheme("light")}
                        className="cursor-pointer"
                    >
                        Light
                        <DropdownMenuShortcut>
                            <Sun />
                        </DropdownMenuShortcut>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={theme === "dark"}
                        className="cursor-pointer"
                        onCheckedChange={() => setTheme("dark")}
                    >
                        Dark
                        <DropdownMenuShortcut>
                            <Moon />
                        </DropdownMenuShortcut>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={theme === "system"}
                        className="cursor-pointer"
                        onCheckedChange={() => setTheme("system")}
                    >
                        System
                        <DropdownMenuShortcut>
                            <Cpu />
                        </DropdownMenuShortcut>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
