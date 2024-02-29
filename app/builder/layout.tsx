import { auth } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function BuilderLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await auth();

    if (!session) {
        return redirect("/login");
    }

    return <>{children}</>;
}
