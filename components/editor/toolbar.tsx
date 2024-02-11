import { Link, Image as ImageIcon } from "lucide-react";
import { useCallback } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import TextDropdown from "@/components/editor/text-dropdown";
import ColorDropdown from "@/components/editor/color-dropdown";
import TextToggleGroup from "@/components/editor/text-toggle-group";
import LinkDialog from "@/components/editor/link-dialog";

type Props = {
    editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
    const addImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full rounded-bl-none rounded-br-none h-auto dark:bg-transparent bg-zinc-200 rounded flex flex-nowrap justify-center items-center">
            <TextDropdown editor={editor} />
            <TextToggleGroup editor={editor} />
            <LinkDialog editor={editor} />
            {/* IMAGE */}
            <Toggle
                size={"sm"}
                className="rounded-bl-none rounded-tl-none rounded-tr rounded-br"
                aria-label="Toggle Image"
                onPressedChange={addImage}
            >
                <ImageIcon />
            </Toggle>
            <ColorDropdown editor={editor} />
        </div>
    );
}
