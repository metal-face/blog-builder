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
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { MdFormatUnderlined } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { AiFillPicture } from "react-icons/ai";
import { useCallback } from "react";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";

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
            {/* HEADING 1 */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run()
                        }
                        className={
                            editor.isActive("heading", { level: 1 })
                                ? "is-active"
                                : ""
                        }
                        variant="outline"
                        size={"sm"}
                    >
                        <LuHeading1 />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 1</TooltipContent>
            </Tooltip>
            {/* HEADING 2 */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                        }
                        className={
                            editor.isActive("heading", { level: 2 })
                                ? "is-active ml-1"
                                : "ml-1"
                        }
                        variant="outline"
                        size={"sm"}
                    >
                        <LuHeading2 />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 2</TooltipContent>
            </Tooltip>
            {/* HEADING 3 */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run()
                        }
                        className={
                            editor.isActive("heading", { level: 3 })
                                ? "is-active ml-1"
                                : "ml-1"
                        }
                        variant="outline"
                        size={"sm"}
                    >
                        <LuHeading3 />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Heading 3</TooltipContent>
            </Tooltip>
            {/* BOLD */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        className="m-1"
                        variant="outline"
                        size={"sm"}
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <FaBold />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
            </Tooltip>
            {/* ITALIC */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size={"sm"}
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <FaItalic />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
            </Tooltip>
            {/* UNDERLINE */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        className="m-1"
                        size="sm"
                        variant="outline"
                        onClick={() => editor.commands.toggleUnderline()}
                    >
                        <MdFormatUnderlined />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
            </Tooltip>
            {/* STRIKETHROUGH */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <FaStrikethrough />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Strikethrough</TooltipContent>
            </Tooltip>
            {/* CODE */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        className="ml-1"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleCode().run()
                        }
                    >
                        <FaCode />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Code Block</TooltipContent>
            </Tooltip>
            {/* BULLET LIST */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                        className={
                            editor.isActive("bulletList")
                                ? "m-1 is-active"
                                : "m-1"
                        }
                    >
                        <CiBoxList />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>
            {/* NUMBER LIST */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>Number List</TooltipContent>
            </Tooltip>
            {/* SUBSCRIPT */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        size="sm"
                        className="ml-1"
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleSubscript().run()
                        }
                    >
                        <FaSubscript />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Subscript</TooltipContent>
            </Tooltip>
            {/* SUPERSCRIPT */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        size="sm"
                        className="ml-1"
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleSuperscript().run()
                        }
                    >
                        <FaSuperscript />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Superscript</TooltipContent>
            </Tooltip>
            {/* LINK */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        onClick={setLink}
                        size="sm"
                        variant="outline"
                        className={
                            editor.isActive("link") ? "m-1 is-active" : "m-1"
                        }
                    >
                        <FaLink />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Link</TooltipContent>
            </Tooltip>
            {/* IMAGE */}
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" onClick={addImage}>
                        <AiFillPicture />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Image (from URL)</TooltipContent>
            </Tooltip>
        </div>
    );
}
