import { FC } from "react"
import { EditorButton } from "../editorButton/EditorButton"
import { IIconsProps } from "../../shared/iconsProps"
import c from "./editorMenu.module.css"
import { StyleType } from "../../shared/styleType"
import { useCurrentEditor } from "@tiptap/react"

interface IProps {
    icons?: IIconsProps
}

export const EditorMenu: FC<IProps> = ({ icons }) => {
    const { editor } = useCurrentEditor()
    if (!editor) {
        return
    }

    const styleToogleHandler = (style: StyleType) => {
        let cmdChain = editor.can().chain().focus()
        switch (style) {
            case "Bold":
                cmdChain.toggleBold().run()
                break
            case "Italic":
                cmdChain.toggleItalic().run()
                break
            case "Strike":
                cmdChain.toggleStrike().run()
                break
            case "Quote":
                cmdChain.toggleBlockquote().run()
        }
    }

    return (
        <div className={c.editor_menu}>
            <EditorButton
                onClick={() => editor.can().chain().focus().toggleBold().run()}
                className={c.editor_button}
                defaultText="B"
                href={icons?.boldIconHref}
            />
            <EditorButton
                onClick={() => styleToogleHandler("Italic")}
                className={c.editor_button}
                defaultText="I"
                href={icons?.italicIconHref}
            />
            <EditorButton
                onClick={() => styleToogleHandler("Strike")}
                className={c.editor_button}
                defaultText="S"
                href={icons?.strikeIconHref}
            />
            <EditorButton
                onClick={() => styleToogleHandler("Quote")}
                className={c.editor_button}
                defaultText="Q"
                href={icons?.quoteHref}
            />
        </div>
    )
}
