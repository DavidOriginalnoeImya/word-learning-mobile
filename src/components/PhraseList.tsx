import React, {FC, useEffect, useState} from 'react';
import Phrase from "./Phrase";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreenParams} from "../../App";
import {HeaderBackButton} from "@react-navigation/elements";
import phraseStore from "../stores/PhraseStore";
import {Directions, Gesture, GestureDetector} from "react-native-gesture-handler";

export type PhraseListProps = NativeStackScreenProps<StackScreenParams, "Phrases">;

interface IPhraseListComponent {
    navigation: PhraseListProps["navigation"];
    route: PhraseListProps["route"];
}

const PhraseList: FC<IPhraseListComponent> = ({ route, navigation }) => {
    const { phrases } = route.params;

    const [curPhraseIndex, setCurPhraseIndex] = useState(0);

    const [checked, setChecked] = useState(false);

    const getNextPhraseIndex = () => {
        return curPhraseIndex === phrases.length - 1 ? 0 : curPhraseIndex + 1;
    }

    const onFlingeGesture = (phraseMemorized: boolean) => {
        if (checked) {
            phraseStore.setPhraseMemorized(curPhraseIndex, phraseMemorized);
            setCurPhraseIndex(getNextPhraseIndex());
            setChecked(false);
        }
    }

    const singleTapGesture = Gesture.Tap()
        .onStart(() => setChecked(!checked));

    const rightFlingGesture =  Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => onFlingeGesture(true));

    const leftFlingGesture =  Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => onFlingeGesture(false));

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
                    onPress={route.params.onBackButtonPress}
                />
            )
        });
    }, []);

    return (
        <GestureDetector gesture={gesture}>
            <Phrase
                phrase={phrases[curPhraseIndex]}
                checked={checked}
            />
        </GestureDetector>
    );
};

export default PhraseList;