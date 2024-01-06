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
