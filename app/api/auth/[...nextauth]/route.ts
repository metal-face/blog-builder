import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";



export const authOptions: NextAuthOptions = {
    providers: [
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
