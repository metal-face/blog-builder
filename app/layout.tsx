import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppBar } from "@/components/app-bar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <head>
                <title>Blog Builder</title>
            </head>
            <body className={inter.className}>
                <Providers>
                    <AppBar />
                    <div className="h-full">{children}</div>
                </Providers>
            </body>
        </html>
    );
}
