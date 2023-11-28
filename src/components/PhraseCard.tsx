import React, {FC, useEffect, useState} from 'react';
import {Card, Text} from "@rneui/themed";
import {StyleSheet, TextInput, View} from "react-native";
import isStringsEqual from "../utils/isStringsEqual";
import speaker from "../utils/Speaker";
import {RectButton} from "react-native-gesture-handler";
import {Phrase, Status} from "../model/Phrase";

interface PhraseComponent {
    phrase: Phrase;
    answerInputRef: React.RefObject<TextInput>;
}

const PhraseCard: FC<PhraseComponent> = ({ phrase, answerInputRef }) => {
    const [answer, setAnswer] = useState("");

    const [answerColor, setAnswerColor] = useState("black");

    const getPhraseSourceText = () => {
        return phrase.status === Status.DEST_LANG ? phrase.translation : phrase.phrase;
    }

    const getPhraseTranslation = () => {
        return phrase.status === Status.DEST_LANG ? phrase.phrase: phrase.translation;
    }

    const getAnswerColor = () => {
        return isStringsEqual(getPhraseTranslation(), answer) ? "green" : "red";
    }

    useEffect(() => {
        if (phrase.status !== Status.DEST_LANG) {
            speaker.speak(phrase.phrase);
        }
        setAnswer("");
        setAnswerColor("black");
    }, [phrase]);

    return (
        <Card containerStyle={styles.card}>
            <RectButton
                disallowInterruption
                delayLongPress={1}
                onLongPress={() => speaker.speak(phrase.phrase)}
            >
                <View style={styles.phrase} pointerEvents="none">
                    <Text h1>
                        {getPhraseSourceText()}
                    </Text>
                </View>
            </RectButton>
            <Card.Divider/>
            <View style={styles.phrase}>
                <TextInput
                    style={{color: answerColor}}
                    onChangeText={setAnswer}
                    ref={answerInputRef}
                    onSubmitEditing={() => setAnswerColor(getAnswerColor())}
                />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    phrase: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        borderRadius: 20,
        marginBottom: 10
    },
    play_btn: {
        marginRight: 5,
        marginTop: 10
    }
});

export default PhraseCard;