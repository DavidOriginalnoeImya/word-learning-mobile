import {makeAutoObservable} from "mobx";
import axios from "axios";
import {Phrase} from "../model/Phrase";

interface IServerPhrase {
    id: bigint;
    phrase: string;
    translation: string;
}

class PhraseStore {
    private serverUrl = "http://192.168.31.152:8086/api/phrases";

    private PHRASE_BATCH_SIZE = 10;

    private allPhrases: Phrase[] = [];

    phrases: Phrase[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public initPhrases = async () => {
        if (this.allPhrases.length < this.PHRASE_BATCH_SIZE) {
            const { data } = await axios.get<IServerPhrase[]>(this.serverUrl);

            if (Array.isArray(data)) {
                this.setAllPhrases(data);
            }
        }

        this.setPhrases(this.allPhrases.slice(0, this.PHRASE_BATCH_SIZE));
    }

    public saveTranslatedPhrases = async (onSuccess?: () => void) => {
        const translatedPhrases = this.getPhraseForSaving(this.phrases);

        if (translatedPhrases.length > 0) {
            const { data } = await axios.put<IServerPhrase[]>(this.serverUrl, translatedPhrases);

            if (Array.isArray(data)) {
                this.filterMemorizedPhrases(data);
                if (onSuccess) {
                    onSuccess();
                }
            }
        }
    }

    private getPhraseIds(phrases: IServerPhrase[]) {
        return new Set<bigint>(phrases.map(p => p.id));
    }

    private getPhraseForSaving(phrases: Phrase[]) {
        return phrases
            .filter(p => p.isMemorized())
            .map(p => this.convertToServerPhrase(p));
    }

    private filterMemorizedPhrases(memorizedPhrases: IServerPhrase[]) {
        const memorizedPhraseIds = this.getPhraseIds(memorizedPhrases);

        this.setAllPhrases(
            this.allPhrases.filter(p =>
                !memorizedPhraseIds.has(p.id)
            )
        );
    }

    private setAllPhrases(phrases: IServerPhrase[]) {
        this.allPhrases = phrases.map(sp => new Phrase(sp.id, sp.phrase, sp.translation));
    }

    private setPhrases(phrases: Phrase[]) {
        this.phrases = phrases;
    }

    private convertToServerPhrase(phrase: Phrase): IServerPhrase {
        return {
            id: phrase.id,
            phrase: phrase.phrase,
            translation: phrase.translation
        };
    }
}

const phraseStore = new PhraseStore();

export default phraseStore;