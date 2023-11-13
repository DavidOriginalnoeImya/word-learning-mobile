import axios from "axios";
import getServerPath from "./getServerPath";

class Translator {
    public translateString = (
        sourceText: string, onTranslate: (translation: string) => void
    ) => {
        if (sourceText) {
            const params = {
                text: sourceText.trim(), sl: "en", dl: "ru"
            }

            axios.get<string>(
                    getServerPath("/api/translations"), {params: params}
                )
                .then(response => response.data)
                .then(data => onTranslate(data));
        }
    }

    public saveTranslation = (text: string, translation: string) => {
        axios.post(
            getServerPath("/api/phrases"), {
                phrase: text,
                translation: translation
            }
        );
    }
}

const translator = new Translator();
export default translator;
