"use client";

import * as React from "react";
import { Sun, Moon, Cpu } from "lucide-react";

import { useTheme, ThemeProvider } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
    const { setTheme, theme, systemTheme } = useTheme();

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

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="default">
                    Theme
                    {determineTheme() === "light" ? (
                        <Sun className="ml-1 scale-75" />
                    ) : (
                        <Moon className="dark:visible dark:ml-1 dark:scale-75" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setTheme("light")}
                    >
                        Light
                        <DropdownMenuShortcut>
                            <Sun />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setTheme("dark")}
                    >
                        Dark
                        <DropdownMenuShortcut>
                            <Moon />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setTheme("system")}
                    >
                        System
                        <DropdownMenuShortcut>
                            <Cpu />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
