import NextAuth from "next-auth/next";
import * from ""

export type { Session, DefaultSession as DefaultAuthSession } from 'next-auth';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session {
    user: User & { role: RoleTypes[] };
  }
}

if (!process.env.GITHUB_ID) {
    throw new Error("No GITHUB_ID has been provided.");
}

if (!process.env.GITHUB_SECRET) {
    throw new Error("No GITHUB_SECRET has been provided.");
}

const cookiePrefix = "__Secure-";
const cookieDomain = "metalface.ca";

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    pages: {
        signIn: "/login",
    },
    cookies: {
        sessionToken: {
            name: `${cookiePrefix}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                domain: cookieDomain,
                secure: true,
            },
        },
    },
    callbacks: {
        session: async (opts) => {
            if (!("user" in opts))
                throw new Error("unreachable, we're not using JWT");

            const { session, user } = opts;
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                    role: user.roles.map((r) => r.role),
                },
            };
        },
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            profile: (p) => ({
                id: p.id.toString(),
                name: p.login,
                email: p.email,
                image: p.avatar_url,
            }),
        }),
    ],
});
function GithubProvider(arg0: {
    clientId: string;
    clientSecret: string;
    profile: (p: any) => { id: any; name: any; email: any; image: any };
}): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.");
}
