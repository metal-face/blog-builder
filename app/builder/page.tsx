"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

// TODO figure out wtf is going on here
import { AppBar } from "@/components/app-bar";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
);

function BlogBuilder() {
    const [value, setValue] = useState(
        `**Hello world!!!** <IFRAME SRC=\"javascript:javascript:alert(window.origin);\"></IFRAME>`
    );

    return (
        <div>
            <AppBar></AppBar>
            <div className="container">
                {/* TODO - figure out why I need app bar here */}

                <MDEditor
                    value={value}
                    /* @ts-ignore */
                    onChange={setValue}
                    /* @ts-ignore */
                    height="80vh"
                    autoFocus
                    visiableDragbar={false}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                />
            </div>
        </div>
    );
}

export default BlogBuilder;
