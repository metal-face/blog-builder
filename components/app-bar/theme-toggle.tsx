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

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="default" className="p-0">
                    Theme
                    <Sun className="ml-1 scale-75 dark:hidden" />
                    <Moon className="ml-1 scale-75 hidden dark:block" />
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
