import React from "react";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { MainNav } from "@/components/app-bar/main-nav";
import "./globals.css";
import "@/app/login/style.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="keywords"
                    content="Blog, Blogging, blog, blogging, writing"
                />
                <meta name="author" content="metal-face" />
                <meta name="darkreader-lock" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                <title>Blog Builder</title>
            </head>
            <body className={inter.className + " overflow-x-hidden"}>
                <Providers>
                    <main className="h-screen w-screen">
                        <MainNav />
                        {children}
                    </main>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
