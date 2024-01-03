'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { Button } from './ui/button'
import { FontBoldIcon } from '@radix-ui/react-icons'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div className="h-screen w-full">
      <div className="w-full h-12 my-2 mx-2 px-2 flex justify-start items-center">
        <Button variant="outline" onClick={() => editor.chain().focus().toggleBold().run()}>
          <FontBoldIcon className="w-4 h-4"/>
        </Button>
      </div>
      <EditorContent className="editor" editor={editor} />
    </div>
  )
}

export default Tiptap