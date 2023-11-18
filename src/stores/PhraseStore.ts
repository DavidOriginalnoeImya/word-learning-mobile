import {makeAutoObservable} from "mobx";
import axios from "axios";

interface IServerPhrase {
    id: bigint;
    phrase: string;
    translation: string;
}

export interface IPhrase extends IServerPhrase {
    memorized: boolean;
}

class PhraseStore {
    private serverUrl = "http://192.168.31.152:8086/api/phrases";

    private PHRASE_BATCH_SIZE = 3;

    private allPhrases: IPhrase[] = [];

    phrases: IPhrase[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public initPhrases = async () => {
        this.allPhrases.forEach(p => console.log(p.phrase))
        if (this.allPhrases.length < this.PHRASE_BATCH_SIZE) {
            const { data } = await axios.get<IPhrase[]>(this.serverUrl);

            if (Array.isArray(data)) {
                this.setAllPhrases(data);
            }
        }

        this.setPhrases(this.allPhrases.slice(0, this.PHRASE_BATCH_SIZE));
    }

    public saveTranslatedPhrases = async (onSuccess?: () => void) => {
        const translatedPhrases = this.getPhraseForSaving(this.phrases);

        if (translatedPhrases.length > 0) {
            const { data } = await axios.put<IPhrase[]>(this.serverUrl, translatedPhrases);

            if (Array.isArray(data)) {
                this.filterMemorizedPhrases(data);
                if (onSuccess) {
                    onSuccess();
                }
            }
        }
    }

    public setPhraseMemorized = (phraseIndex: number, memorized: boolean = true) => {
        if (phraseIndex >= 0 && phraseIndex < this.phrases.length) {
            this.phrases[phraseIndex].memorized = memorized;
        }
    }



    private getPhraseIds(phrases: IPhrase[]) {
        return new Set<bigint>(phrases.map(p => p.id));
    }

    private getPhrasesFromServer = async () => {
        const { data } = await axios.get<IPhrase>(this.serverUrl);

        if (Array.isArray(data)) {
            this.setAllPhrases(data);
        }
    }

    private getPhraseForSaving(phrases: IPhrase[]) {
        return phrases
            .filter(p => p.memorized)
            .map(p => this.convertToServerPhrase(p));
    }

    private filterMemorizedPhrases(memorizedPhrases: IPhrase[]) {
        const memorizedPhraseIds = this.getPhraseIds(memorizedPhrases);

        this.setAllPhrases(
            this.allPhrases.filter(p =>
                !memorizedPhraseIds.has(p.id)
            )
        );
    }

    private getUnmemorizedPhrases() {
        return this.allPhrases.filter(p => !p.memorized);
    }

    private setAllPhrases(phrases: IPhrase[]) {
        this.allPhrases = phrases;
    }

    private setPhrases(phrases: IPhrase[]) {
        this.phrases = phrases;
    }

    private convertToServerPhrase(phrase: IPhrase): IServerPhrase {
        return {
            id: phrase.id,
            phrase: phrase.phrase,
            translation: phrase.translation
        };
    }
}

const phraseStore = new PhraseStore();

export default phraseStore;