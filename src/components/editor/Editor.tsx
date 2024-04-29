import { FC } from "react"
import { EditorMenu } from "../editorMenu/EditorMenu"
import { EditorContent, EditorProvider, Extensions, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { IIconsProps } from "../../shared/iconsProps"
import c from "./editor.module.css"

interface IProps {
    placeholder?: string
    icons?: IIconsProps
}

const extensions: Extensions = [StarterKit]

export const Editor: FC<IProps> = ({ placeholder, icons }) => {
    const editor = useEditor({ extensions, content: placeholder })
    if (!editor) {
        return
    }

    return (
        <div className={c.editor}>
            test
            <EditorContent editor={editor} />
            <EditorMenu icons={icons} editor={editor} />
        </div>
    )
}
