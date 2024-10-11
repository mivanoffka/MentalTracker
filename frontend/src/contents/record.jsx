class Record {
    #value
    #datetime

    get value() {
        return this.#value
    }

    set value(value) {
        this.#value = value
    }

    get datetime() {
        return this.#datetime
    }

    set datetime(value) {
        this.#datetime = value
    }

    constructor(value, datetime) {
        this.#datetime = datetime
        this.#value = value
    }
}

export default Record