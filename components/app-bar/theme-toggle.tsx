"use client";

import { Cpu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function determineTheme(theme?: string, systemTheme?: string) {
    switch (theme) {
        case "system":
            return systemTheme;
        case "light":
            return "light";
        case "dark":
            return "dark";
        default:
            return "dark";
    }
}

export function ThemeToggle() {
    const { setTheme, systemTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="default" className="p-0">
                    Theme
                    {determineTheme(theme, systemTheme) === "light" ? (
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
