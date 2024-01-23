import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
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

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            authorization: { params: { scope: scopes.join(" ") } },
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            profile(profile) {
                let userRole: string = "google user";

                if (profile?.email === "hughesbryan3000@gmail.com") {
                    userRole = "admin";
                }

                console.log("Google Profile: ", profile);

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        GithubProvider({
            profile(profile) {
                let userRole: string = "github user";

                if (profile?.email === "hughesbryan3000@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    id: profile.id.toString(),
                    name: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: userRole,
                };
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }: any) {
            console.log("session", session, "token", token);
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
