import { Dayjs } from "dayjs";

class Record {
    #id: number;
    #value: number;
    #datetime: Dayjs;

    get id(): number {
        return this.#id;
    }

    get value(): number {
        return this.#value;
    }

    set value(value: number) {
        this.#value = value;
    }

    get datetime(): Dayjs {
        return this.#datetime;
    }

    set datetime(value: Dayjs) {
        this.#datetime = value;
    }

    constructor(value: number, datetime: Dayjs, id: number) {
        this.#datetime = datetime;
        this.#value = value;
        this.#id = id;
    }
}

export default Record;
