import { Editor } from "@tiptap/react";
import TextDropdown from "@/components/editor/text-dropdown";
import ColorDropdown from "@/components/editor/color-dropdown";
import TextToggleGroup from "@/components/editor/text-toggle-group";
import LinkDialog from "@/components/editor/link-dialog";
import ImageDialog from "@/components/editor/image-dialog";
import AlignmentDropdown from "@/components/editor/alignment-dropdown";
import YoutubeDialog from "./youtube-dialog";

type Props = {
    editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
    if (!editor) {
        return null;
    }

    return (
        <div className="w-full rounded-bl-none rounded-br-none h-auto bg-transparent rounded flex flex-nowrap justify-center items-center">
            <TextDropdown editor={editor} />
            <AlignmentDropdown editor={editor} />
            <TextToggleGroup editor={editor} />
            <LinkDialog editor={editor} />
            <ImageDialog editor={editor} />
            <YoutubeDialog editor={editor} />
            <ColorDropdown editor={editor} />
        </div>
    );
}
