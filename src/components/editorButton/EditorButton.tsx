import { FC } from "react"

interface IProps {
    href?: string
    defaultText: string
    className?: string
    onClick?: () => void
}

export const EditorButton: FC<IProps> = ({ href, defaultText, className, onClick }) => {
    // todo: use img
    return (
        <div onClick={onClick} className={className}>
            {href ? href : defaultText}
        </div>
    )
}
