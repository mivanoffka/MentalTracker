import { Dayjs } from "dayjs"

class Record {
    static #gerenatedIds: number[] = []

    static #generateTemporalId() : number {
        let id: number = -1 * Record.#getRandomInt(1, 1024)
        while (Record.#gerenatedIds.includes(id)) {
            id =  -1 * Record.#getRandomInt(1, 1024);
        }

        Record.#gerenatedIds.push(id);
        return id;
    }

    static #getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    #id: number
    #value: number
    #datetime: Dayjs

    get id(): number {
        return this.#id
    }

    get value(): number {
        return this.#value
    }

    set value(value: number) {
        this.#value = value
    }

    get datetime(): Dayjs {
        return this.#datetime
    }

    set datetime(value: Dayjs) {
        this.#datetime = value
    }

    constructor(value: number, datetime: Dayjs, id: number | null = null) {
        this.#datetime = datetime
        this.#value = value
        this.#id = id === null ? Record.#generateTemporalId() : id
    }
}

export default Record