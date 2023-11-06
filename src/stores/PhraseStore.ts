import {makeAutoObservable} from "mobx";
import axios from "axios";

export interface Phrase {
    phrase: string;
    translation: string;
}

class PhraseStore {
    private serverUrl = "http://192.168.31.152:8086";

    phrases: Phrase[] = [];

    constructor() {
        makeAutoObservable(this);
        this.initPhrases();
    }

    private async initPhrases() {
        const { data } = await axios.get<Phrase>(this.serverUrl + "/api/phrases");

        if (Array.isArray(data)) {
            this.setPhrases(data);
        }
    }

    private setPhrases(phrases: Phrase[]) {
        this.phrases = phrases;
    }
}

const phraseStore = new PhraseStore();

export default phraseStore;