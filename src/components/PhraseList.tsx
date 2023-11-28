import React, {FC, useEffect, useRef, useState} from 'react';
import PhraseCard from "./PhraseCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreenParams} from "../../App";
import {HeaderBackButton} from "@react-navigation/elements";
import {Directions, Gesture, GestureDetector} from "react-native-gesture-handler";
import {Phrase} from "../model/Phrase";
import {TextInput} from "react-native";

export type PhraseListProps = NativeStackScreenProps<StackScreenParams, "Phrases">;

interface IPhraseListComponent {
    navigation: PhraseListProps["navigation"];
    route: PhraseListProps["route"];
    onBackButtonPress: () => void;
}

const PhraseList: FC<IPhraseListComponent> = ({ route, navigation, onBackButtonPress }) => {
    const { phrases } = route.params;

    const [curPhraseIndex, setCurPhraseIndex] = useState(0);

    const getNextPhraseIndex = () => {
        return curPhraseIndex === phrases.length - 1 ? 0 : curPhraseIndex + 1;
    }

    const onBackPress = () => {
        onBackButtonPress();
        navigation.pop();
    }

    const onRightFlingGesture = () => {
        phrases[curPhraseIndex].setNextStatus();
        setCurPhraseIndex(getNextPhraseIndex());
    }

    const onLeftFlingGesture = () => {
        phrases[curPhraseIndex].setPrevStatus();
        setCurPhraseIndex(getNextPhraseIndex());
    }

    const rightFlingGesture= Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(onRightFlingGesture);

    const leftFlingGesture= Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(onLeftFlingGesture);

    const answerInputRef = useRef<TextInput>(null);

    const upFlingGesture= Gesture.Fling()
        .direction(Directions.UP)
        .onStart(() => answerInputRef.current!.focus());

    const gesture= Gesture.Race(rightFlingGesture, leftFlingGesture, upFlingGesture);

    useEffect( () => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={onBackPress}
                />
            )
        });
    }, []);

    return (
        <GestureDetector gesture={gesture}>
            <PhraseCard
                phrase={phrases[curPhraseIndex]}
                answerInputRef={answerInputRef}
            />
        </GestureDetector>
    );
};

export default PhraseList;