class Data {
    #model
    #data

    get model() {
        return this.#model
    }

    get data() {
        return this.#data
    }

    constructor(model) {
        this.#model = model
        this.#data = []
    }
}

export default Data