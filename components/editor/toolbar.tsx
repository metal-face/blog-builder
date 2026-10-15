import type { Editor } from "@tiptap/react";
import ColorDropdown from "@/components/editor/color-dropdown";
import ImageDialog from "@/components/editor/image-dialog";
import LinkDialog from "@/components/editor/link-dialog";
import TextDropdown from "@/components/editor/text-dropdown";
import TextStylesDropdown from "@/components/editor/text-styles-dropdown";
import YoutubeDialog from "@/components/editor/youtube-dialog";

type Props = {
    editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
    if (!editor) {
        return null;
    }

    return (
        <div className="w-full rounded-bl-none rounded-br-none h-auto gap-2 pb-2 bg-transparent rounded flex flex-nowrap justify-center items-center">
            <TextDropdown editor={editor} />
            <TextStylesDropdown editor={editor} />
            <ColorDropdown editor={editor} />
            <LinkDialog editor={editor} />
            <ImageDialog editor={editor} />
            <YoutubeDialog editor={editor} />
        </div>
    );
}
