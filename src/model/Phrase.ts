import phrase from "../components/PhraseCard";

export enum Status {
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
    get status(): Status {
        return this._status;
    }
    private readonly _id: bigint;
    private readonly _phrase: string;
    private readonly _translation: string;
    private _status: Status = Status.SOURCE_LANG;

    constructor(id: bigint, phrase: string, translation: string) {
        this._id = id;
        this._phrase = phrase;
        this._translation = translation;
    }

    setNextStatus() {
        this._status = nextStatus[this._status];
    }

    setPrevStatus() {
        this._status = prevStatus[this._status];
    }

    isMemorized = () => {
        return this._status === Status.MEMORIZED;
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