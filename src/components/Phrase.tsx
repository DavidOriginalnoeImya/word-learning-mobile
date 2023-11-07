import React, {FC, useState} from 'react';
import {Card} from "@rneui/themed";
import {TextInput} from "react-native";
import {IPhrase} from "../stores/PhraseStore";
import getStrBaseView from "../utils/getStringBaseView";

interface PhraseComponent {
    phrase: IPhrase;
    checked: boolean;
}

const Phrase: FC<PhraseComponent> = ({ phrase, checked }) => {
    const [answer, setAnswer] = useState("");

    const getAnswerColor = () => {
        return getStrBaseView(phrase.translation) === getStrBaseView(answer) ? "green" : "red";
    }

    return (
        <Card>
            {
                !checked &&
                <>
                    <Card.Title>
                        {phrase.phrase}
                    </Card.Title>
                    <Card.Divider/>
                    <TextInput
                        placeholder="Enter your translation..."
                        onChangeText={(text => setAnswer(text))}
                    />
                </>
            }
            {
                checked &&
                <>
                    <Card.Title style={{color: getAnswerColor()}}>
                        {phrase.translation}
                    </Card.Title>
                </>
            }
        </Card>
    );
};

export default Phrase;