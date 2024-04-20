import { OffsetOutOfRangeException } from "./exceptions/OffsetOutOfRangeException.ts"

type StylesType = "bold" | "italic" | "underline"

interface ISlice {
    offset: number
    size: number
    styles: StylesType[]
}

export class EditorState {
    slices: ISlice[]
    text: string

    public constructor(text: string) {
        this.text = text
        this.slices = [
            {
                offset: 0,
                size: text.length,
                styles: [],
            },
        ]
    }

    public addSlice(offset: number, size: number, styles: StylesType[]) {
        this.slices.push({
            offset: offset,
            size: size,
            styles: styles,
        })
    }

    public removeText(offset: number, size: number) {
        if (offset <= 0) {
            this.slices = []
            this.text = ""
            return
        }

        if (offset > this.text.length) {
            throw new OffsetOutOfRangeException("Вы вышли за границу текста")
        }

        this.slices = this.slices.filter((slice) => {
            if (offset > slice.offset && offset + size < slice.offset + slice.size) {
                return {
                    ...slice,
                    offset: slice.offset + (slice.offset + slice.size - (offset + size)),
                }
            }

            if (offset > slice.offset && offset < slice.offset + slice.size) {
                return {
                    ...slice,
                    size: slice.size - (offset + size - slice.offset + slice.size),
                }
            }

            if (offset < slice.offset && offset < slice.offset + slice.size) {
                return {
                    ...slice,
                    offset: slice.offset - (slice.offset - offset),
                    size: slice.size - (slice.size - size),
                }
            }
        })
    }
}

// if (offset < slice.offset && offset + size > slice.offset) {
//     return
// }
