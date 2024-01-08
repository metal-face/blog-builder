import GithubProvider from "next-auth/providers/github";
export const options = {
    providers: [
        GithubProvider({
            profile(profile) {
                console.log(`GitHub Profile: ${profile}`);

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
        async jwt({ token, user }: any) {
            if (user) token.role = user.role;
        },
        async session({ session, token }: any) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
};
