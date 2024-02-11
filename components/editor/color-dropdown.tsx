import { Editor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Palette, Baseline } from "lucide-react";

type Props = {
    editor: Editor | null;
};
export default function ColorDropdown({ editor }: Props) {
    if (!editor) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    <Palette />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
                <DropdownMenuLabel>Color</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() =>
                            editor.chain().focus().unsetColor().run()
                        }
                    >
                        Default
                        <DropdownMenuShortcut>
                            <Baseline />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            editor.chain().focus().setColor("#A020F0").run()
                        }
                    >
                        Purple
                        <DropdownMenuShortcut>
                            <Baseline color="#A020F0" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            editor.chain().focus().setColor("#FF0000").run()
                        }
                    >
                        Red
                        <DropdownMenuShortcut>
                            <Baseline color="#FF0000" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
