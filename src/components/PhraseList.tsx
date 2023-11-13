import React, {FC, useEffect, useState} from 'react';
import {BackHandler, GestureResponderEvent, View} from "react-native";
import {Icon} from '@rneui/themed';
import Phrase from "./Phrase";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreenParams} from "../../App";
import phraseStore from "../stores/PhraseStore";
import {HeaderBackButton} from "@react-navigation/elements";

export type PhraseListProps = NativeStackScreenProps<StackScreenParams, "Phrases">;

interface IPhraseListComponent {
    navigation: PhraseListProps["navigation"];
    route: PhraseListProps["route"];
}

const PhraseList: FC<IPhraseListComponent> = ({ route, navigation }) => {
    const { phrases } = route.params;

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