"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider, useSession } from "next-auth/react";

interface ProviderProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
    );
}
