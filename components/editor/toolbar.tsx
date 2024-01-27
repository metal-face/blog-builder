import { Button } from "@/components/ui/button";
import {
    FaCode,
    FaLink,
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaHighlighter,
} from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { AiFillPicture } from "react-icons/ai";

export default function Toolbar({ editor }: any) {
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
                className="m-1"
                size="sm"
                variant="outline"
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <FaCode />
            </Button>
            {/* HIGHLIGHT */}
            <Button
                size="sm"
                variant="outline"
                onClick={() =>
                    editor.commands.toggleHighlight({
                        color: "#ffcc00",
                    })
                }
            >
                <FaHighlighter />
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
            <Button
                size="sm"
                variant="outline"
                className={editor.isActive("link") ? "m-1 is-active" : "m-1"}
            >
                <FaLink />
            </Button>
            <Button
                size="sm"
                variant="outline"
                onClick={addImage}
            >
                <AiFillPicture />
            </Button>
        </div>
    );
}
