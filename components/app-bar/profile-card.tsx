import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ProfileCardProps {}

export default function ProfileCard() {
    return (
        <HoverCard>
            <HoverCardTrigger>User Name</HoverCardTrigger>
            <HoverCardContent>User details</HoverCardContent>
        </HoverCard>
    );
}
