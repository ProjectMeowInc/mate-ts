import { FC } from "react"
import { EditorMenu } from "../editorMenu/EditorMenu"
import { EditorProvider, Extensions } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { IIconsProps } from "../../shared/iconsProps"
import c from "./editor.module.css"

interface IProps {
    placeholder?: string
    icons?: IIconsProps
}

const extensions: Extensions = [
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
]

export const Editor: FC<IProps> = ({ placeholder }) => {
    return (
        <EditorProvider
            slotAfter={<EditorMenu />}
            extensions={extensions}
            content={`<div>${placeholder ?? ""}</div>`}
        ></EditorProvider>
    )
}
