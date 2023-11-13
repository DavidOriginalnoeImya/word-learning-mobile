import {makeAutoObservable} from "mobx";
import axios from "axios";

interface IServerPhrase {
    id: string;
    phrase: string;
    translation: string;
}

export interface IPhrase extends IServerPhrase {
    correctTranslationGiven: boolean;
}

class PhraseStore {
    private serverUrl = "http://192.168.31.152:8086/api/phrases";

    phrases: IPhrase[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public async initPhrases() {
        const { data } = await axios.get<IPhrase>(this.serverUrl);

        if (Array.isArray(data)) {
            this.setPhrases(data);
        }
    }

    public saveTranslatedPhrases = () => {
        const translatedPhrases = this.phrases
            .filter(p => p.correctTranslationGiven)
            .map(p => this.convertToServerPhrase(p));

        if (translatedPhrases.length > 0) {
            axios.put(this.serverUrl, translatedPhrases);
        }
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