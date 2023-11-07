import React, {FC, useState} from 'react';
import {GestureResponderEvent, TextInput, View} from "react-native";
import {Card, Icon} from '@rneui/themed';
import {IPhrase} from "../stores/PhraseStore";
import Phrase from "./Phrase";

interface IPhraseListComponent {
    phrases: IPhrase[];
}

const PhraseList: FC<IPhraseListComponent> = ({ phrases }) => {
    const [curPhraseIndex, setCurPhraseIndex] = useState(0);

    const [checked, setChecked] = useState(false);

    const getPrevPhraseIndex = () => {
        return curPhraseIndex === 0 ? phrases.length - 1 : curPhraseIndex - 1;
    }

    const getNextPhraseIndex = () => {
        return curPhraseIndex === phrases.length - 1 ? 0 : curPhraseIndex + 1;
    }

    const onChangePhraseButtonPress = (nextPhraseIndex: number) => {
        setCurPhraseIndex(nextPhraseIndex);
        setChecked(false);
    }

    const onCheckButtonPress = (e: GestureResponderEvent) => {
        e.preventDefault();
        setChecked(!checked);
    }

    return (
        <>
            <Phrase
                phrase={phrases[curPhraseIndex]}
                checked={checked}
            />
            <View style={
                {
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "center"
                }
            }>
                <Icon
                    onPress={() => onChangePhraseButtonPress(getPrevPhraseIndex())}
                    name="chevron-left"
                    reverse
                />
                <Icon
                    onPress={onCheckButtonPress}
                    name="check" reverse/>
                <Icon
                    onPress={() => onChangePhraseButtonPress(getNextPhraseIndex())}
                    name="chevron-right"
                    reverse
                />
            </View>
        </>
    );
};

export default PhraseList;