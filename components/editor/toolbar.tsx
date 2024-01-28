import { Button } from "@/components/ui/button";
import {
    FaCode,
    FaLink,
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaSubscript,
    FaSuperscript,
} from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { AiFillPicture } from "react-icons/ai";
import { useCallback } from "react";

export default function Toolbar({ editor }: any) {
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

    return (
        <div className="w-screen h-12 flex flex-nowrap justify-center items-center">
            {/* BOLD */}
            <Button
                className="m-1"
                variant="outline"
                size={"sm"}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <FaBold />
            </Button>
            {/* ITALIC */}
            <Button
                variant="outline"
                size={"sm"}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <FaItalic />
            </Button>
            {/* UNDERLINE */}
            <Button
                className="m-1"
                size="sm"
                variant="outline"
                onClick={() => editor.commands.toggleUnderline()}
            >
                <MdFormatUnderlined />
            </Button>
            {/* STRIKETHROUGH */}
            <Button
                size="sm"
                variant="outline"
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <FaStrikethrough />
            </Button>
            {/* CODE */}
            <Button
                className="ml-1"
                size="sm"
                variant="outline"
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <FaCode />
            </Button>
            {/* BULLET LIST */}
            <Button
                size="sm"
                variant="outline"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                    editor.isActive("bulletList") ? "m-1 is-active" : "m-1"
                }
            >
                <CiBoxList />
            </Button>
            {/* NUMBER LIST */}
            <Button
                size="sm"
                variant="outline"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "is-active" : ""}
            >
                <MdFormatListNumbered />
            </Button>
            {/* SUBSCRIPT */}
            <Button
                size="sm"
                className="ml-1"
                variant="outline"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
            >
                <FaSubscript />
            </Button>
            {/* SUPERSCRIPT */}
            <Button
                size="sm"
                className="ml-1"
                variant="outline"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
            >
                <FaSuperscript />
            </Button>
            {/* LINK */}
            <Button
                onClick={setLink}
                size="sm"
                variant="outline"
                className={editor.isActive("link") ? "m-1 is-active" : "m-1"}
            >
                <FaLink />
            </Button>
            {/* IMAGE */}
            <Button size="sm" variant="outline" onClick={addImage}>
                <AiFillPicture />
            </Button>
        </div>
    );
}
