"use client";
import Tiptap from "@/components/editor/tip-tap";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BlogBuilder() {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "unauthenticated") {
        router.push("/login");
    }

    if (status === "loading") {
        return (
            <div className="custom-container flex justify-center items-center">
                Loading...
            </div>
        );
    } else return <Tiptap />;
}
