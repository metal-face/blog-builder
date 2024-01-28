import Tiptap from "@/components/editor/tip-tap";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";

export default async function BlogBuilder() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/login");
    }

    return <Tiptap />;
}
