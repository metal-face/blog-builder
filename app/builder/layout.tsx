import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import type { ReactNode } from "react";
import { auth } from "@/auth/auth";
export default async function BuilderLayout({ children }: { children: ReactNode }) {
    const session: Session | null = await auth();

    if (!session) {
        return redirect("/login");
    }

    return <>{children}</>;
}
