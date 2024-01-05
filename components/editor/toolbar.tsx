import { Button } from "@/components/ui/button";
import {
    FontBoldIcon,
    FontItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
    CodeIcon,
    ColorWheelIcon,
    ListBulletIcon,
} from "@radix-ui/react-icons";
import { Editor } from "@tiptap/react";

export default function Toolbar({ editor }: any) {
    return (
        <div className="w-screen h-12 flex flex-nowrap justify-start items-center">
            <div className="m-1">
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <FontBoldIcon className="w-4 h-4" />
                </Button>
            </div>
            <div>
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <FontItalicIcon className="w-4 h-4" />
                </Button>
            </div>
            <div className="m-1">
                <Button
                    variant="outline"
                    onClick={() => editor.commands.toggleUnderline()}
                >
                    <UnderlineIcon className="w-4 h-4" />
                </Button>
            </div>
            <div>
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <StrikethroughIcon className="w-4 h-4" />
                </Button>
            </div>
            <div className="m-1">
                <Button
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <CodeIcon className="w-4 h-4" />
                </Button>
            </div>
            <div>
                <Button
                    variant="outline"
                    onClick={() =>
                        editor.commands.toggleHighlight({
                            color: "#ffcc00",
                        })
                    }
                >
                    <ColorWheelIcon className="w-4 h-4" />
                </Button>
            </div>
            <div className="m-1">
                <Button
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    <ListBulletIcon className="w-4 h-4" />
                </Button>
            </div>
            <div>
                <Button
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    1.
                </Button>
            </div>
        </div>
    );
}
