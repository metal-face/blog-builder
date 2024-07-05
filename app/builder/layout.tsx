import { auth } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Session } from "next-auth";

export default async function BuilderLayout({ children }: { children: ReactNode }) {
    const session: Session | null = await auth();

    if (!session) {
        return redirect("/login");
    }

    return <>{children}</>;
}
