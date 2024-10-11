class Record {
    #value: number
    #datetime: Date

    get value(): number {
        return this.#value
    }

    set value(value: number) {
        this.#value = value
    }

    get datetime(): Date {
        return this.#datetime
    }

    set datetime(value: Date) {
        this.#datetime = value
    }

    constructor(value: number, datetime: Date) {
        this.#datetime = datetime
        this.#value = value
    }
}

export default Record