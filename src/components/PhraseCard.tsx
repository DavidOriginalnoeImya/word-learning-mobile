import React, {FC, useState} from 'react';
import {Card, Icon, Text} from "@rneui/themed";
import {StyleSheet, TextInput, View} from "react-native";
import isStringsEqual from "../utils/isStringsEqual";
import speaker from "../utils/Speaker";
import {Directions, Gesture, GestureDetector, RectButton} from "react-native-gesture-handler";
import {Phrase} from "../model/Phrase";

interface PhraseComponent {
    phrase: Phrase;
}

const PhraseCard: FC<PhraseComponent> = ({ phrase }) => {
    const [answer, setAnswer] = useState("");

    const getAnswerColor = () => {
        return isStringsEqual(phrase.translation, answer) ? "green" : "red";
    }

    return (
        <Card containerStyle={styles.card}>
            <RectButton
                disallowInterruption
                delayLongPress={1}
                onLongPress={() => speaker.speak(phrase.phrase)}
            >
                <View style={styles.phrase} pointerEvents="none">
                    <Text h1>
                        {phrase.phrase}
                    </Text>
                </View>
            </RectButton>
            <Card.Divider/>
            <View>
                <TextInput
                    placeholder="Enter your translation..."
                    onChangeText={setAnswer}
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