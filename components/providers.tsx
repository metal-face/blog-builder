"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}
