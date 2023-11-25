import React, {FC, useEffect, useState} from 'react';
import PhraseCard from "./PhraseCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreenParams} from "../../App";
import {HeaderBackButton} from "@react-navigation/elements";
import {Directions, Gesture, GestureDetector} from "react-native-gesture-handler";

export type PhraseListProps = NativeStackScreenProps<StackScreenParams, "Phrases">;

interface IPhraseListComponent {
    navigation: PhraseListProps["navigation"];
    route: PhraseListProps["route"];
    onBackButtonPress: () => void;
}

const PhraseList: FC<IPhraseListComponent> = ({ route, navigation, onBackButtonPress }) => {
    const { phrases } = route.params;

    const [curPhraseIndex, setCurPhraseIndex] = useState(0);

    const [checked, setChecked] = useState(false);

    const getNextPhraseIndex = () => {
        return curPhraseIndex === phrases.length - 1 ? 0 : curPhraseIndex + 1;
    }

    const onBackPress = () => {
        onBackButtonPress();
        navigation.pop();
    }

    const onFlingGesture = (phraseMemorized: boolean) => {
        if (checked) {
            setCurPhraseIndex(getNextPhraseIndex());
            setChecked(false);
        }
    }

    const singleTapGesture = Gesture.Tap()
        .onStart(() => setChecked(!checked));

    const rightFlingGesture =  Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => onFlingGesture(true));

    const leftFlingGesture =  Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => onFlingGesture(false));

    const gesture = Gesture.Race(
        singleTapGesture,
        rightFlingGesture,
        leftFlingGesture
    );

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
                checked={checked}
            />
        </GestureDetector>
    );
};

export default PhraseList;