import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { MainNav } from "@/components/app-bar/main-nav";
import { Toaster } from "@/components/ui/toaster";
import { NextFont } from "next/dist/compiled/@next/font";
import React, { ReactNode } from "react";
import "./globals.css";
import "@/app/login/style.css";

const inter: NextFont = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="keywords" content="Blog, Blogging, blog, blogging, writing" />
                <meta name="author" content="metal-face" />
                <meta name="darkreader-lock" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/icon.tsx" type="image/png" sizes="32x32" />
                <title>Blog Builder</title>
            </head>
            <body className={inter.className + " overflow-x-hidden"}>
                <main className="h-screen w-screen">
                    <Providers>
                        <MainNav />
                        {children}
                    </Providers>
                </main>
                <Toaster />
            </body>
        </html>
    );
}
