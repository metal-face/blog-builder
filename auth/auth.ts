import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import type { Adapter, AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma, RoleTypes } from "@/lib/prisma";

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

if (!process.env.ADMIN_EMAILS) {
    throw new Error("No GOOGLE_SECRET has been provided.");
}

declare module "next-auth" {
    interface Session {
        user: User & { role: RoleTypes };
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser extends User {
        role: RoleTypes;
    }
}

const useSecureCookies = process.env.VERCEL_ENV === "production";
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const cookieDomain = useSecureCookies ? "blog-builder.com" : "localhost";

const adminEmails: string[] = process.env.ADMIN_EMAILS.split(",");

export const { handlers, auth } = NextAuth({
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
                secure: useSecureCookies,
            },
        },
    },
    adapter: {
        ...(PrismaAdapter(prisma) as Adapter),
        createUser: async (data: AdapterUser) => {
            const user = await prisma.user.create({
                data: {
                    ...data,
                    name: data.name || "",
                    role: adminEmails.includes(data.email) ? RoleTypes.ADMIN : RoleTypes.USER,
                },
            });

            return user;
        },
        getSessionAndUser: async (sessionToken: string) => {
            const userAndSession = await prisma.session.findUnique({
                where: { sessionToken: sessionToken },
                include: { user: true },
            });
            if (!userAndSession) return null;
            const { user, ...session } = userAndSession;
            return { user, session };
        },
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            allowDangerousEmailAccountLinking: true,
            profile(profile) {
                let role: RoleTypes = RoleTypes.USER;

                if (adminEmails.includes(profile.email)) {
                    role = RoleTypes.ADMIN;
                }

                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: role,
                };
            },
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
            profile(profile) {
                let role: RoleTypes = RoleTypes.USER;

                if (profile.email) {
                    if (adminEmails.includes(profile.email)) {
                        role = RoleTypes.ADMIN;
                    }
                }

                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: role,
                };
            },
        }),
    ],
    callbacks: {
        session: async (opts) => {
            if (!("user" in opts)) {
                throw new Error("unreachable, we're not using JWT");
            }

            const { session, user } = opts;

            return {
                ...session,
                user,
            };
        },
    },
    secret: process.env.AUTH_SECRET as string,
});
