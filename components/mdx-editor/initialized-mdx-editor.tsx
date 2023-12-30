"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    linkPlugin,
    linkDialogPlugin,
    InsertTable,
    tablePlugin,
    SandpackConfig,
    codeBlockPlugin,
    sandpackPlugin,
    codeMirrorPlugin,
    ConditionalContents,
    ChangeCodeMirrorLanguage,
    ShowSandpackInfo,
    InsertCodeBlock,
    InsertSandpack,
} from "@mdxeditor/editor";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: "react",
    presets: [
        {
            label: "React",
            name: "react",
            meta: "live react",
            sandpackTemplate: "react",
            sandpackTheme: "light",
            snippetFileName: "/App.js",
            snippetLanguage: "jsx",
            initialSnippetContent: defaultSnippetContent,
        },
    ],
};

// Only import this to the next file
export default function InitializedMDXEditor({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
    return (
        <MDXEditor
            plugins={[
                // Example Plugin Usage
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                tablePlugin(),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            {" "}
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <InsertTable />
                            <ConditionalContents
                                options={[
                                    {
                                        when: (editor) =>
                                            editor?.editorType === "codeblock",
                                        contents: () => (
                                            <ChangeCodeMirrorLanguage />
                                        ),
                                    },
                                    {
                                        when: (editor) =>
                                            editor?.editorType === "sandpack",
                                        contents: () => <ShowSandpackInfo />,
                                    },
                                    {
                                        fallback: () => (
                                            <>
                                                <InsertCodeBlock />
                                                <InsertSandpack />
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        </>
                    ),
                }),
                linkPlugin(),
                linkDialogPlugin({
                    linkAutocompleteSuggestions: [
                        "https://virtuoso.dev",
                        "https://mdxeditor.dev",
                    ],
                }),
                codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
                sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                codeMirrorPlugin({
                    codeBlockLanguages: { js: "JavaScript", css: "CSS" },
                }),
            ]}
            {...props}
            ref={editorRef}
        />
    );
}
