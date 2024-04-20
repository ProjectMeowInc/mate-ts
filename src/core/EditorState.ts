import { assert } from "console"
import { BaseIterator, some } from "ts-result-meow"

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

        assert(offset > this.text.length, "Offset can't be more than text length")

        const iterator = new BaseIterator(this.slices)

        const newSlice = iterator.filterMap((val) => {
            if (offset > val.offset && offset + size < slice.offset + slice.size) {
                return {
                    ...val,
                    offset: val.offset + (val.offset + val.size - (offset + size)),
                }
            }

            if (offset > val.offset && offset < val.offset + val.size) {
                return {
                    ...val,
                    size: val.size - (offset + size - val.offset + val.size),
                }
            }

            if (offset < val.offset && offset < val.offset + val.size) {
                return some({
                    ...val,
                    offset: val.offset - (val.offset - offset),
                    size: val.size - (val.size - size),
                })
            }
        }) as BaseIterator<ISlice>

        this.slices = newSlice.collect()
    }
}
