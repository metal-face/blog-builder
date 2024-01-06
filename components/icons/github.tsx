import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface GitHubLogoProps {
    classes?: string;
}

export default function GitHubLogo({ classes }: GitHubLogoProps) {
    return <GitHubLogoIcon className={`h-4 w-4 ${classes}`} />;
}
