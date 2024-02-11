import { Link, Image as ImageIcon } from "lucide-react";
import { useCallback } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import TextDropdown from "@/components/editor/text-dropdown";
import ColorDropdown from "@/components/editor/color-dropdown";
import TextToggleGroup from "@/components/editor/text-toggle-group";

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

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        editor
            ?.chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full rounded-bl-none rounded-br-none h-auto dark:bg-transparent bg-zinc-200 rounded flex flex-nowrap justify-center items-center">
            <TextDropdown editor={editor} />
            <TextToggleGroup editor={editor} />
            {/* LINK */}
            <Toggle
                size={"sm"}
                aria-label="Toggle Link"
                pressed={editor.isActive("link")}
                onPressedChange={setLink}
            >
                <Link />
            </Toggle>
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
