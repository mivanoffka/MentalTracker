class Model {
    #title
    #minValue
    #maxValue
    #labels
    #imageSources

    get title() {
        return this.#title
    }

    get minValue() {
        return this.#minValue
    }

    get maxValue() {
        return this.#maxValue
    }

    get labels() {
        return this.#labels
    }

    get imageSources() {
        return this.#imageSources
    }

    get range() {
        return this.#maxValue - this.#minValue
    }

    getCorrectedIndex(index, correctionRange) {
        const indexCorrected = Math.floor(correctionRange * (index / (this.#maxValue - this.#minValue)))
        if (indexCorrected < 0)
            return 0
        if (indexCorrected >= correctionRange)
            return correctionRange - 1
        return indexCorrected
    }

    getLabel(index) {
        return this.#labels[this.getCorrectedIndex(index, this.#labels.length)]
    }

    getImageSource(index) {
        return this.#imageSources[this.getCorrectedIndex(index, this.#imageSources.length)]
    }

    constructor(title, minValue, maxValue, labels, imageSources) {
        this.#title = title
        this.#minValue = minValue
        this.#maxValue = maxValue
        this.#labels = labels
        this.#imageSources = imageSources
    }
}

export default Model