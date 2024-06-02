"use client";

import * as React from "react";
import { Sun, Moon, Cpu } from "lucide-react";

import { useTheme } from "next-themes";

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
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Sun className="scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
