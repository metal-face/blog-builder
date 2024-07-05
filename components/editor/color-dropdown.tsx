import { Editor } from "@tiptap/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Palette, Baseline, ChevronDown } from "lucide-react";

type Props = {
    editor: Editor | null;
};
export default function ColorDropdown({ editor }: Props) {
    if (!editor) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="text-xs" size={"sm"} variant={"ghost"}>
                    Colors <ChevronDown className="ml-2" size={15} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => editor.chain().focus().unsetColor().run()}
                        className="text-xs"
                    >
                        Default
                        <DropdownMenuShortcut>
                            <Baseline />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => editor.chain().focus().setColor("#A020F0").run()}
                        className="text-xs"
                    >
                        Purple
                        <DropdownMenuShortcut>
                            <Baseline color="#A020F0" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => editor.chain().focus().setColor("#FF0000").run()}
                        className="text-xs"
                    >
                        Red
                        <DropdownMenuShortcut>
                            <Baseline color="#FF0000" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => editor.chain().focus().setColor("#FFFF00").run()}
                        className="text-xs"
                    >
                        Yellow
                        <DropdownMenuShortcut>
                            <Baseline color="#FFFF00" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => editor.chain().focus().setColor("#0000FF").run()}
                        className="text-xs"
                    >
                        Blue
                        <DropdownMenuShortcut>
                            <Baseline color="#0000FF" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => editor.chain().focus().setColor("#008000").run()}
                        className="text-xs"
                    >
                        Green
                        <DropdownMenuShortcut>
                            <Baseline color="#008000" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => editor.chain().focus().setColor("#FFA500").run()}
                        className="text-xs"
                    >
                        Orange
                        <DropdownMenuShortcut>
                            <Baseline color="#FFA500" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => editor.chain().focus().setColor("#FFC0CB").run()}
                        className="text-xs"
                    >
                        Pink
                        <DropdownMenuShortcut>
                            <Baseline color="#FFC0CB" />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
