import { assert } from "console"
import { BaseIterator, Option, none, some } from "ts-result-meow"

type StylesType = "bold" | "italic" | "underline"
type RemoveType = "Left" | "Right" | "Normal"

export class EditorState {
    slices: Slice[]
    text: string

    public constructor(text: string) {
        this.text = text
        this.slices = [new Slice(0, text.length, [])]
    }

    public splitSlice(index: number) {
        this.slices.push({
            offset: offset,
            size: size,
            styles: styles,
        })
    }

    public removeSliceByRange(start: number, end: number) {
        // todo
    }

    public removeSliceByIndex(index: number, type: RemoveType) {
        const slice = this.getSliceByIndex(index).unwrap()
        if (type === "Normal") {
            slice.clearStyles()
            return
        }

        if (type === "Left") {
            const prevSlice = this.getSliceByIndex(index - 1).unwrap()
            prevSlice.setSize(prevSlice.getSize() + slice.getSize())
        }

        if (type === "Right") {
            const nextSlice = this.getSliceByIndex(index + 1).unwrap()
            nextSlice.setOffset(nextSlice.getOffset() - slice.getSize())
            nextSlice.setSize(nextSlice.getSize() + slice.getSize())
        }

        this.slices.splice(index, 1)
    }

    public getSlices(): Slice[] {
        return this.slices
    }

    public getSliceByIndex(index: number): Option<Slice> {
        const val = this.slices.at(index)
        if (!val) {
            return none()
        }

        return some(val)
    }
}

export class Slice {
    private offset: number
    private size: number
    private styles: StylesType[]

    public constructor(offset: number, size: number, styles: StylesType[]) {
        this.offset = offset
        this.size = size
        this.styles = styles
    }

    public clearStyles() {
        this.styles = []
    }

    public setSize(size: number) {
        this.size = size
    }

    public setOffset(offset: number) {
        this.offset = offset
    }

    public getOffset(): number {
        return this.offset
    }

    public getSize(): number {
        return this.size
    }

    public getStyles(): StylesType[] {
        return this.styles
    }
}
