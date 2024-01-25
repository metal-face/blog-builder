import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";

if (!process.env.DISCORD_CLIENT_ID) {
    throw new Error("No DISCORD_CLIENT_ID has been provided.");
}

if (!process.env.DISCORD_CLIENT_SECRET) {
    throw new Error("No DISCORD_CLIENT_SECRET has been provided.");
}

if (!process.env.GITHUB_ID) {
    throw new Error("No GITHUB_ID has been provided.");
}

if (!process.env.GITHUB_SECRET) {
    throw new Error("No GITHUB_SECRET has been provided.");
}

if (!process.env.GOOGLE_ID) {
    throw new Error("No GOOGLE_ID has been provided.");
}

if (!process.env.GOOGLE_SECRET) {
    throw new Error("No GOOGLE_SECRET has been provided.");
}

const scopes = ["identify", "email"];

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: { params: { scope: scopes.join(" ") } },
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            allowDangerousEmailAccountLinking: true,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            // if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }: any) {
            // if (
            //     session.user.email === "hughesbryan3000@gmail.com" ||
            //     session.user.email === "mail@bryanhughes.net"
            // ) {
            //     session.user.role = "admin";
            // }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
