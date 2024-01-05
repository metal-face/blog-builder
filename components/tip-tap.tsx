"use client";

import "@/app/style.scss";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import Toolbar from "./editor/toolbar";

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            //@ts-ignore
            TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
            Underline,
            Link.configure({
                protocols: ["ftp", "mailto"],
                openOnClick: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    // Change rel to different value
                    // Allow search engines to follow links(remove nofollow)
                    rel: "noopener noreferrer",
                    // Remove target entirely so links open in current tab
                    target: null,
                },
                validate: (href) => /^https?:\/\//.test(href),
            }),
            Highlight.configure({
                multicolor: true,
            }),
        ],

        content: "<p>Hello World! 🌎️</p>",
    }); // 👈️

    if (!editor) {
        return null;
    }

    return (
        <div className=" ">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
