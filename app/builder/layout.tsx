import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { ReactNode } from "react";
export default async function BuilderLayout({ children }: { children: ReactNode }) {
    const session: Session | null = await auth();

    if (!session) {
        return redirect("/login");
    }

    return <>{children}</>;
}
