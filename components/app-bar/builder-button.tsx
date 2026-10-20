"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const BuilderButton = () => {
    const currentPath = usePathname();
    return currentPath !== "/builder" ? (
        <Button variant="outline" className="ml-1">
            Blog 🛠️
        </Button>
    ) : null;
};

export default BuilderButton;
