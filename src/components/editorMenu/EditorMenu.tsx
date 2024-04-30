import { FC } from "react"
import { EditorButton } from "../editorButton/EditorButton"
import { IIconsProps } from "../../shared/iconsProps"
import c from "./editorMenu.module.css"
import { StyleType } from "../../shared/styleType"
import { useCurrentEditor } from "@tiptap/react"

interface IProps {
    icons?: IIconsProps
    submitHandler: () => void
}

export const EditorMenu: FC<IProps> = ({ icons, submitHandler }) => {
    const { editor } = useCurrentEditor()
    if (!editor) {
        return
    }

    const styleToggleHandler = (style: StyleType) => {
        const cmdChain = editor.chain().focus()
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
            <div className={c.style_buttons}>
                <EditorButton
                    onClick={() => styleToggleHandler("Bold")}
                    className={c.editor_button}
                    defaultText="B"
                    href={icons?.boldIconHref}
                />
                <EditorButton
                    onClick={() => styleToggleHandler("Italic")}
                    className={c.editor_button}
                    defaultText="I"
                    href={icons?.italicIconHref}
                />
                <EditorButton
                    onClick={() => styleToggleHandler("Strike")}
                    className={c.editor_button}
                    defaultText="S"
                    href={icons?.strikeIconHref}
                />
                <EditorButton
                    onClick={() => styleToggleHandler("Quote")}
                    className={c.editor_button}
                    defaultText="Q"
                    href={icons?.quoteHref}
                />
            </div>
            <div className={c.send_button}>
                <EditorButton onClick={() => submitHandler()} defaultText="Send" className={c.editor_button} />
            </div>
        </div>
    )
}
