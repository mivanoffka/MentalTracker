class Model {
    #title: string
    #minValue: number
    #maxValue: number
    #labels: string[]
    #imageSources: string[]

    get title(): string {
        return this.#title
    }

    get minValue() : number {
        return this.#minValue
    }

    get maxValue() : number{
        return this.#maxValue
    }

    get labels() : string[] {
        return this.#labels
    }

    get imageSources() : string[] {
        return this.#imageSources
    }

    get range() {
        return this.#maxValue - this.#minValue
    }

    getCorrectedIndex(index: number, correctionRange: number): number {
        const indexCorrected = Math.floor(correctionRange * (index / (this.#maxValue - this.#minValue)))
        if (indexCorrected < 0)
            return 0
        if (indexCorrected >= correctionRange)
            return correctionRange - 1

        return indexCorrected
    }

    getLabel(index: number): string {
        return this.#labels[this.getCorrectedIndex(index, this.#labels.length)]
    }

    getImageSource(index: number): string {
        return this.#imageSources[this.getCorrectedIndex(index, this.#imageSources.length)]
    }

    constructor(title: string, minValue: number, maxValue: number, labels: string[], imageSources: string[]) {
        this.#title = title
        this.#minValue = minValue
        this.#maxValue = maxValue
        this.#labels = labels
        this.#imageSources = imageSources
    }
}

export default Model