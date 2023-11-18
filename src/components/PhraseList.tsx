import React, {FC, useEffect, useState} from 'react';
import {GestureResponderEvent} from "react-native";
import Phrase from "./Phrase";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreenParams} from "../../App";
import {HeaderBackButton} from "@react-navigation/elements";
import PhraseNavigationPanel from "./PhraseNavigationPanel";
import phraseStore from "../stores/PhraseStore";

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

    const onSavePhraseButtonPress = (phraseMemorized: boolean) => {
        phraseStore.setPhraseMemorized(curPhraseIndex, phraseMemorized);
        setCurPhraseIndex(getNextPhraseIndex);
        setChecked(false);
    }

    const onCheckButtonPress = () => {
        setChecked(!checked);
    }

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
        <>
            <Phrase
                phrase={phrases[curPhraseIndex]}
                checked={checked}
            />
            <PhraseNavigationPanel
                onSavePhrasePress={() => onSavePhraseButtonPress(true)}
                onDropPhrasePress={() => onSavePhraseButtonPress(false)}
                onCheckPhrasePress={onCheckButtonPress}
            />
        </>
    );
};

export default PhraseList;