import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

import { Session } from "next-auth";
import { TypographyP } from "../typography/typography-p";

interface ProfileCardProps {
    session: Session | null;
}

export default function ProfileCard({ session }: ProfileCardProps) {
    return (
        <HoverCard>
            <HoverCardTrigger className="text-sm">
                {session?.user?.image ? (
                    <Avatar className="mr-1">
                        <AvatarImage
                            src={session.user.image}
                            alt="User Profile Image"
                        />
                        {/* <AvatarFallback>
                                <Image
                                    src={session.user.image}
                                    alt="User Profile Image"
                                    layout="fill"
                                />
                            </AvatarFallback> */}
                    </Avatar>
                ) : (
                    <p className="text-xs cursor-pointer mr-1">
                        {session?.user?.name}
                    </p>
                )}
            </HoverCardTrigger>
            {session?.user?.email ? (
                <HoverCardContent className="text-xs">
                    <div className="w-2/3 text-xs">
                        <p>{session.user.email}</p>
                    </div>
                </HoverCardContent>
            ) : null}
        </HoverCard>
    );
}
