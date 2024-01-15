import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { Awaitable, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

// TODO: Establish if options.ts is the correct file and this is obsolete

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            profile(profile) {
                let userRole = "github user";

                if (profile?.email === "hughesbryan3000@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    id: profile.id.toString(),
                    role: userRole,
                };
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
