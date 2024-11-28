import dayjs from "dayjs";
import Record from "./Record.tsx";

class Model {
    #index: number;
    #title: string;
    #minValue: number;
    #maxValue: number;
    #labels: string[];
    #imageSources: string[];
    #primaryColor: string;
    #secondaryColor: string;
    #defaultValue: number;

    get title(): string {
        return this.#title;
    }

    get minValue(): number {
        return this.#minValue;
    }

    get maxValue(): number {
        return this.#maxValue;
    }

    get labels(): string[] {
        return this.#labels;
    }

    get imageSources(): string[] {
        return this.#imageSources;
    }

    get middleValue() {
        return Math.floor((this.#maxValue - this.#minValue) / 2);
    }

    get primaryColor(): string {
        return this.#primaryColor;
    }

    get secondaryColor(): string {
        return this.#secondaryColor;
    }

    get defaultValue(): number {
        return this.#defaultValue;
    }

    getCorrectedIndex(index: number, correctionRange: number): number {
        const indexCorrected = Math.floor(
            correctionRange * (index / (this.#maxValue - this.#minValue))
        );
        if (indexCorrected < 0) return 0;
        if (indexCorrected >= correctionRange) return correctionRange - 1;

        return indexCorrected;
    }

    getLabel(index: number): string {
        return this.#labels[this.getCorrectedIndex(index, this.#labels.length)];
    }

    getImageSource(index: number): string {
        return this.#imageSources[
            this.getCorrectedIndex(index, this.#imageSources.length)
        ];
    }

    getDefaultRecord(): Record {
        return new Record(this.defaultValue, dayjs(), -1);
    }

    get index(): number {
        return this.#index;
    }

    constructor(
        index: number,
        title: string,
        minValue: number,
        maxValue: number,
        defaultValue: number,
        labels: string[],
        imageSources: string[],
        primaryColor: string,
        secondaryColor: string
    ) {
        this.#index = index;
        this.#title = title;
        this.#minValue = minValue;
        this.#maxValue = maxValue;
        this.#labels = labels;
        this.#imageSources = imageSources;
        this.#primaryColor = primaryColor;
        this.#secondaryColor = secondaryColor;
        this.#defaultValue = defaultValue;
    }
}

export default Model;
