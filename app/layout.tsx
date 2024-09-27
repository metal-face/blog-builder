import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { MainNav } from "@/components/app-bar/main-nav";
import { Toaster } from "@/components/ui/toaster";
import { NextFont } from "next/dist/compiled/@next/font";
import React, { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
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
                <meta property="og:image" content="https://blog-builder.com/api/og" />

                <meta property="og:url" content="https://blog-builder.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Blog Builder" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="https://blog-builder.com/api/og" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="blog-builder.com" />
                <meta property="twitter:url" content="https://blog-builder.com" />
                <meta name="twitter:title" content="Blog Builder" />
                <meta name="twitter:description" content="" />
                <meta name="twitter:image" content="https://blog-builder.com/api/og" />

                <meta name="cf-2fa-verify" content="807835066d55c79" />
                <link rel="icon" href="/icon.tsx" type="image/png" sizes="32x32" />
                <title>Blog Builder</title>
            </head>
            <body className={inter.className + " overflow-x-hidden bg-zinc-100 dark:bg-zinc-900"}>
                <Analytics />
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
