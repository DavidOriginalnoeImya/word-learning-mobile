import React, {FC, useState} from 'react';
import {Card, Text} from "@rneui/themed";
import {StyleSheet, TextInput, View} from "react-native";
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
        <Card containerStyle={styles.card}>
            {
                !checked &&
                <>
                    <View style={styles.phrase}>
                        <Text h1>
                            {phrase.phrase}
                        </Text>
                    </View>
                    <Card.Divider/>
                    <TextInput
                        placeholder="Enter your translation..."
                        onChangeText={(text => setAnswer(text))}
                    />
                </>
            }
            {
                checked &&
                <View style={{...styles.phrase, marginTop: "80%"}}>
                    <Text style={{color: getAnswerColor()}} h3>
                        {phrase.translation}
                    </Text>
                </View>
            }
        </Card>
    );
};

const styles = StyleSheet.create({
    phrase: {
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        flex: 1,
        borderRadius: 20
    }
});

export default Phrase;