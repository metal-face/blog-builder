"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Button } from "./ui/button";
import {
    FontBoldIcon,
    FontItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
    CodeIcon,
    ColorWheelIcon,
    Link1Icon,
    ListBulletIcon,
} from "@radix-ui/react-icons";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";

Highlight.configure({
    multicolor: true,
});

BulletList.configure({
    keepAttributes: true,
    keepMarks: true,
    itemTypeName: "bulletList",
});

ListItem.configure({
    HTMLAttributes: {
        class: "my-custom-class",
    },
});

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
});

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Highlight],
        content: "<p>Hello World! 🌎️</p>",
    }); // 👈️               

    if (!editor) {
        return null;
    }

    return (
        <div className="h-screen w-full">
            <div className="w-screen h-12 flex flex-nowrap justify-around items-center">
                <div className="m-1">
                    <Button
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <FontBoldIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
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
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        <StrikethroughIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className="m-1">
                    <Button
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleCode().run()
                        }
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
                {/* <div className="m-1">
                    <Button
                        variant="outline"
                        onClick={() => editor.commands.toggleLink()}
                    >
                        <Link1Icon className="w-4 h-4" />
                    </Button>
                </div> */}
                <div className="m-1">
                    <Button
                        className={
                            editor.isActive("bulletList") ? "is-active" : ""
                        }
                        variant="outline"
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        <ListBulletIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="border h-full">
                <EditorContent className="editor" editor={editor} />
            </div>
        </div>
    );
};

export default Tiptap;
