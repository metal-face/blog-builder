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
                {session?.user?.name}
            </HoverCardTrigger>
            <HoverCardContent className="flex text-xs">
                <div className="w-1/3">
                    {session?.user?.image ? (
                        <Avatar>
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
                    ) : null}
                </div>
                <div className="w-2/3 text-xs">
                    {session?.user?.email ? (
                        <TypographyP text={session.user.email} />
                    ) : null}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
