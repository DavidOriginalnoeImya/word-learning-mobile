import Tts from "react-native-tts";

class Speaker {
    public speak = (text: string) => {
        Tts.speak(text);
    }
}

const speaker = new Speaker();

export default speaker;