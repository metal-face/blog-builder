'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from './ui/button'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <>
      <div className="editor h-full w-full">
        <div className="toolbar w-full h-14">
          <Button>
            
          </Button>
        </div>
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default Tiptap