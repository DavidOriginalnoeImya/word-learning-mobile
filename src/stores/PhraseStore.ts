import {makeAutoObservable} from "mobx";
import axios from "axios";

export interface IPhrase {
    phrase: string;
    translation: string;
}

class PhraseStore {
    private serverUrl = "http://192.168.31.152:8086";

    phrases: IPhrase[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public async initPhrases() {
        const { data } = await axios.get<IPhrase>(this.serverUrl + "/api/phrases");

        if (Array.isArray(data)) {
            this.setPhrases(data);
        }
    }

    private setPhrases(phrases: IPhrase[]) {
        this.phrases = phrases;
    }
}

const phraseStore = new PhraseStore();

export default phraseStore;