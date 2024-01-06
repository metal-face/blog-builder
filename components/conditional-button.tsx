import { Button } from "@/components/ui/button";

interface ConditionalButtonProps {
    name: string;
    visible: boolean;
    classes?: string;
    children?: React.ReactNode;
}

export default function ConditionalButton({
    name,
    visible,
    classes,
    children,
}: ConditionalButtonProps) {
    return visible ? (
        <Button variant="outline" className={classes}>
            {name}
            {children}
        </Button>
    ) : null;
}
