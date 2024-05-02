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
    styles?: {
        width?: string
        height?: string
        accentColor?: string
        backgroundColor?: string
    }
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

        paragraph: {
            HTMLAttributes: {
                class: c.editor__paragraph,
            }
        }
    }),
]

export const Editor: FC<IProps> = ({ placeholder, submitHandler, styles, icons }) => {

    return (
        <div className={c.editor} style={{
            ...styles,
            color: styles?.accentColor,
            border: `1px solid ${styles?.accentColor}`
        }}>
            <EditorProvider
                slotAfter={
                <EditorMenu submitHandler={submitHandler} icons={icons} />
            }
                extensions={extensions}
                content={`<div>${placeholder ?? ""}</div>`}
            >
                <></>
            </EditorProvider>
        </div>
    )
}
