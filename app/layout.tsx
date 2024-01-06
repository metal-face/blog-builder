import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { AppBar } from "@/components/app-bar";
import "./globals.css";
import "@/app/login/style.css";

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
            <body className={inter.className}>
                <div className="h-screen w-screen">
                    <Providers>
                        <AppBar />
                        <div className="content w-full">{children}</div>
                    </Providers>
                </div>
            </body>
        </html>
    );
}
