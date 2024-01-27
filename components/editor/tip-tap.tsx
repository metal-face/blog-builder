"use client";

import "@/app/builder/style.css";
import { useEditor, EditorContent } from "@tiptap/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Toolbar from "@/components/editor/toolbar";
import Image from "@tiptap/extension-image";
import { useCallback } from "react";
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

export default function Tiptap() {
    const form = useForm({
        mode: "onChange",
        defaultValues: {
            title: "Blog Title",
            content: "Hello World 🌎️",
        },
    });
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Color,
            TextStyle,
            Underline,
            Highlight,
            Link.configure({
                openOnClick: false,
                autolink: true,
            }),
            Image,
        ],
        editorProps: {
            attributes: {
                class: "editor w-4/5 h-64 mx-auto rounded border border-gray-800 focus:outline-none  p-2",
            },
        },
        content: "Hello World! 🌎️",
    });

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
        <div className="custom-container flex justify-center flex-col">
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
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
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
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    <MdFormatListNumbered />
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className={
                        editor.isActive("link") ? "m-1 is-active" : "m-1"
                    }
                >
                    <FaLink />
                </Button>
                <Button size="sm" variant="outline" onClick={addImage}>
                    <AiFillPicture />
                </Button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
