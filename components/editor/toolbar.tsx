import { Button } from "@/components/ui/button";
import { FaCode } from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";
import { FaStrikethrough } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaBold } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";
import { MdFormatListNumbered } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";

export default function Toolbar({ editor }: any) {
    return (
        <div className="w-screen h-12 flex flex-nowrap justify-start items-center">
            {/* BOLD */}
            <div className="m-1">
                <Button
                    variant="outline"
                    size={"sm"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <FaBold />
                </Button>
            </div>
            {/* ITALIC */}
            <div>
                <Button
                    variant="outline"
                    size={"sm"}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <FaItalic />
                </Button>
            </div>
            {/* UNDERLINE */}
            <div className="m-1">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor.commands.toggleUnderline()}
                >
                    <MdFormatUnderlined />
                </Button>
            </div>
            {/* STRIKETHROUGH */}
            <div>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <FaStrikethrough />
                </Button>
            </div>
            {/* CODE */}
            <div className="m-1">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    <FaCode />
                </Button>
            </div>
            {/* HIGHLIGHT */}
            <div>
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
            </div>
            {/* BULLET LIST */}
            <div className="m-1">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    <CiBoxList />
                </Button>
            </div>
            {/* NUMBER LIST */}
            <div>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    <MdFormatListNumbered />
                </Button>
            </div>
        </div>
    );
}
