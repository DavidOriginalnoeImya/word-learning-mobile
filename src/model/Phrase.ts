import phrase from "../components/PhraseCard";

enum Status {
    SOURCE_LANG, DEST_LANG, HIDDEN, MEMORIZED
}

export class Phrase {
    private readonly _id: bigint;
    private readonly _phrase: string;
    private readonly _translation: string;
    private status: Status = Status.SOURCE_LANG;

    constructor(id: bigint, phrase: string, translation: string) {
        this._id = id;
        this._phrase = phrase;
        this._translation = translation;
    }

    updateStatus() {
    }

    isMemorized() {
        return this.status === Status.MEMORIZED;
    }

    get id(): bigint {
        return this._id;
    }

    get phrase(): string {
        return this._phrase;
    }

    get translation(): string {
        return this._translation;
    }


}