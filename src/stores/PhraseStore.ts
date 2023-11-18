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

    public async initPhrases() {
        this.setAllPhrases(this.getUnmemorizedPhrases());

        if (this.allPhrases.length < this.PHRASE_BATCH_SIZE) {
            const { data } = await axios.get<IPhrase[]>(this.serverUrl);

            if (Array.isArray(data)) {
                this.setAllPhrases([...this.allPhrases, ...data]);
            }
        }

        this.setPhrases(this.allPhrases.slice(0, this.PHRASE_BATCH_SIZE));
    }

    public saveTranslatedPhrases = () => {
        const translatedPhrases = this.phrases
            .filter(p => p.memorized)
            .map(p => this.convertToServerPhrase(p));

        if (translatedPhrases.length > 0) {
            axios.put(this.serverUrl, translatedPhrases);
        }
    }

    public setPhraseMemorized = (phraseIndex: number, memorized: boolean = true) => {
        if (phraseIndex >= 0 && phraseIndex < this.phrases.length) {
            this.phrases[phraseIndex].memorized = memorized;
        }
    }

    private getPhrasesFromServer = async () => {
        const { data } = await axios.get<IPhrase>(this.serverUrl);

        if (Array.isArray(data)) {
            this.setAllPhrases(data);
        }
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