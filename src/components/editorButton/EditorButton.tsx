import { FC } from "react"

interface IProps {
    href?: string
    defaultText: string
    className?: string
    onClick?: () => void
    styles?: IEditorButtonStyles
}

interface IEditorButtonStyles {
    color?: string
    backgroundColor?: string
}

export const EditorButton: FC<IProps> = ({ href, defaultText, className, onClick, styles }) => {
    // todo: use img
    return (
        <button onClick={onClick} className={className} style={styles}>
            {href ? <img src={href} alt="" /> : defaultText}
        </button>
    )
}
