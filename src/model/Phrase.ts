import phrase from "../components/PhraseCard";

enum Status {
    SOURCE_LANG, DEST_LANG, HIDDEN, MEMORIZED
}

const nextStatus: Record<Status, Status> = {
    [Status.SOURCE_LANG]: Status.DEST_LANG,
    [Status.DEST_LANG]: Status.HIDDEN,
    [Status.HIDDEN]: Status.MEMORIZED,
    [Status.MEMORIZED]: Status.MEMORIZED
};

const prevStatus: Record<Status, Status> = {
    [Status.MEMORIZED]: Status.HIDDEN,
    [Status.HIDDEN]: Status.DEST_LANG,
    [Status.DEST_LANG]: Status.SOURCE_LANG,
    [Status.SOURCE_LANG]: Status.SOURCE_LANG
};

export class Phrase {
    private readonly _id: bigint;
    private readonly _phrase: string;
    private readonly _translation: string;
    status: Status = Status.SOURCE_LANG;

    constructor(id: bigint, phrase: string, translation: string) {
        this._id = id;
        this._phrase = phrase;
        this._translation = translation;
    }

    setNextStatus() {
        this.status = nextStatus[this.status];
    }

    setPrevStatus() {
        this.status = prevStatus[this.status];
    }

    isMemorized = () => {
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