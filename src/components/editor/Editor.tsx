import { FC } from "react"
import { EditorMenu } from "../editorMenu/EditorMenu"
import { EditorProvider, Extensions } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { IIconsProps } from "../../shared/iconsProps"
import c from "./editor.module.css"

interface IProps {
    placeholder?: string
    icons?: IIconsProps
    submitHandler: () => void
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

export const Editor: FC<IProps> = ({ placeholder, submitHandler }) => {
    return (
        <div className={c.editor}>
            <EditorProvider
                slotAfter={<EditorMenu submitHandler={submitHandler} />}
                extensions={extensions}
                content={`<div>${placeholder ?? ""}</div>`}
            >
                <></>
            </EditorProvider>
        </div>
    )
}
