"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { SetStateAction, useState } from "react";

// TODO figure out wtf is going on here
// @ts-ignore
import * as commands from "@uiw/react-md-editor/commands";
import { AppBar } from "@/components/app-bar";

import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function BlogBuilder() {
    const [value, setValue] = useState(
        `**Hello world!!!** <IFRAME SRC=\"javascript:javascript:alert(window.origin);\"></IFRAME>`
    );

    return (
        <div className="container">
            <AppBar></AppBar>
            <div className="wmde-markdown-var"> </div>
            {/* TODO figure out wtf is going on here */}
            {/* @ts-ignore */}

            <MDEditor
                value={value}
                onChange={setValue}
                height="80vh"
                visiableDragbar={false}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
        </div>
    );
}

export default BlogBuilder;
