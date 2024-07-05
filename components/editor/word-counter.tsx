import { Editor } from "@tiptap/react";

type Props = {
    editor: Editor | null;
};

export default function WordCounter({ editor }: Props) {
    if (!editor) return null;

    const wordCount = editor.storage.characterCount.words();
    const characterCount = editor.storage.characterCount.characters();

    return (
        <div className="w-1/2 flex justify-start items-center">
            <p className="text-xs">
                {wordCount} words / {characterCount} characters
            </p>
        </div>
    );
}
