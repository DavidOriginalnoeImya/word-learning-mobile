import React, {FC, useEffect, useRef, useState} from 'react';
import {Card, Text} from "@rneui/themed";
import {StyleSheet, TextInput, View} from "react-native";
import isStringsEqual from "../utils/isStringsEqual";
import speaker from "../utils/Speaker";
import {Directions, Gesture, GestureDetector, RectButton} from "react-native-gesture-handler";
import {Phrase, Status} from "../model/Phrase";

interface PhraseComponent {
    phrase: Phrase;
    index: number;
    cardNum: number;
}

const PhraseCard: FC<PhraseComponent> = ({ phrase, index, cardNum }) => {
    const [answer, setAnswer] = useState("");

    const [zIndex, setZIndex] = useState(index);

    const [memorized, setMemorized] = useState(false);

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
    }, []);

    const setNextZIndex = () => {
        setZIndex(zIndex - cardNum - 1);
    }

    const onRightFlingGesture = () => {
        setNextZIndex();
        phrase.setNextStatus();
        setMemorized(phrase.isMemorized());
    }

    const onLeftFlingGesture = () => {
        setNextZIndex();
        phrase.setPrevStatus();
    }

    const rightFlingGesture= Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(onRightFlingGesture);

    const leftFlingGesture= Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(onLeftFlingGesture);

    const gesture= Gesture.Race(rightFlingGesture, leftFlingGesture);

    const answerInputRef = useRef(null);

    if (memorized) return null;

    return (
        <GestureDetector gesture={gesture}>
            <Card containerStyle={[styles.card, {zIndex: zIndex}]}>
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
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    phrase: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    card: {
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 20,
        marginBottom: 10
    },
    play_btn: {
        marginRight: 5,
        marginTop: 10
    }
});

export default PhraseCard;