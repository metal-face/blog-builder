import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { LogOut } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
    session: Session | null;
}

export default function ProfileCard({ session }: ProfileCardProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {session?.user?.image ? (
                    <Avatar className="ml-1 cursor-pointer">
                        <AvatarImage src={session.user.image} alt="User Profile Image" />
                        {/* <AvatarFallback>
                                    <Image
                                        src={session.user.image}
                                        alt="User Profile Image"
                                        layout="fill"
                                    />
                                </AvatarFallback> */}
                    </Avatar>
                ) : (
                    <p className="hover:underline text-xs cursor-default mr-1">
                        {session?.user?.name}
                    </p>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-1 mr-1">
                <Link href="/api/auth/signout?callbackUrl=/">
                    <DropdownMenuItem className="cursor-pointer">
                        Logout
                        <DropdownMenuShortcut>
                            <LogOut />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
