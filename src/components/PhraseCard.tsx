import React, {FC, useEffect, useRef, useState} from 'react';
import {Card, Text} from "@rneui/themed";
import {NativeSyntheticEvent, StyleSheet, TextInput, TextInputSubmitEditingEventData, View} from "react-native";
import isStringsEqual from "../utils/isStringsEqual";
import speaker from "../utils/Speaker";
import {Directions, Gesture, GestureDetector, RectButton} from "react-native-gesture-handler";
import {Phrase, Status} from "../model/Phrase";

interface PhraseComponent {
    phrase: Phrase;
    index: number;
    cardNum: number;
}

type TextInputSubmit = NativeSyntheticEvent<TextInputSubmitEditingEventData>;

const PhraseCard: FC<PhraseComponent> = ({ phrase, index, cardNum }) => {
    const getPhraseSourceText = () => {
        return phrase.status === Status.DEST_LANG ? phrase.translation : phrase.phrase;
    }

    const getPhraseTranslation = () => {
        return phrase.status === Status.DEST_LANG ? phrase.phrase: phrase.translation;
    }

    const [text, setText] = useState(getPhraseSourceText());

    const [translation, setTranslation] = useState(getPhraseTranslation());

    const [answer, setAnswer] = useState("");

    const [isAnswerInput, setIsAnswerInput] = useState(false);

    const [zIndex, setZIndex] = useState(index);

    const [memorized, setMemorized] = useState(false);

    const [answerColor, setAnswerColor] = useState("black");

    useEffect(() => {
        if (phrase.status !== Status.DEST_LANG) {
            speaker.speak(phrase.phrase);
        }
    }, []);

    const answerInputRef = useRef<TextInput>(null);

    const getAnswerColor = (answer: string) => {
        return isStringsEqual(translation, answer) ? "green" : "red";
    }

    const onAnswerSubmit = (event: TextInputSubmit) => {
        setAnswerColor(getAnswerColor(event.nativeEvent.text));
        setAnswer(event.nativeEvent.text);
    }

    const onSideFlingGesture = () => {
        setZIndex(zIndex - cardNum - 1);
        setMemorized(phrase.isMemorized());
        setText(getPhraseSourceText());
        setTranslation(getPhraseTranslation());
    }

    const onRightFlingGesture = () => {
        phrase.setNextStatus();
        onSideFlingGesture();
    }

    const onLeftFlingGesture = () => {
        phrase.setPrevStatus();
        onSideFlingGesture();
    }

    const rightFlingGesture= Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(onRightFlingGesture);

    const leftFlingGesture= Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(onLeftFlingGesture);

    const singleTapGesture = Gesture.Tap()
        .onStart(() => answerInputRef.current!.focus());

    const gesture= Gesture.Race(rightFlingGesture, leftFlingGesture, singleTapGesture);

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
                        <Text h1> {text} </Text>
                    </View>
                </RectButton>
                <Card.Divider/>
                <View style={styles.phrase} pointerEvents="none">
                    <Text h3 style={{color: answerColor}}>
                        {answer}
                    </Text>
                </View>
                <View style={styles.phrase}>
                    <TextInput
                        ref={answerInputRef}
                        onSubmitEditing={onAnswerSubmit}
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