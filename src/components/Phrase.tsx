import React, {useState} from 'react';
import {GestureResponderEvent, Text, TextInput, View} from "react-native";
import {Card, Icon} from '@rneui/themed';
import {observer} from "mobx-react-lite";
import phraseStore from "../stores/PhraseStore";

const PhraseList = () => {
    const { phrases } = phraseStore;

    const [curPhraseIndex, setCurPhraseIndex] = useState(0);

    const [checked, setChecked] = useState(false);

    if (phrases.length === 0) {
        return <Text>Phrase list is empty</Text>
    }

    const onPrevButtonPress = (e: GestureResponderEvent) => {
        e.preventDefault();
        const newPhraseIndex = curPhraseIndex === 0 ? phrases.length - 1 : curPhraseIndex - 1;
        setCurPhraseIndex(newPhraseIndex);
    }

    const onNextButtonPress = (e: GestureResponderEvent) => {
        e.preventDefault();
        const newPhraseIndex = curPhraseIndex === phrases.length - 1 ? 0 : curPhraseIndex + 1;
        setCurPhraseIndex(newPhraseIndex);
    }

    const onCheckButtonPress = (e: GestureResponderEvent) => {
        e.preventDefault();
        setChecked(!checked);
    }

    return (
        <>
            <Card>
                {
                    !checked &&
                    <>
                        <Card.Title>
                            {phrases[curPhraseIndex].phrase}
                        </Card.Title>
                        <Card.Divider/>
                        <TextInput
                            placeholder="Enter your translation..."
                        />
                    </>
                }
                {
                    checked &&
                    <>
                        <Card.Title>
                            {phrases[curPhraseIndex].translation}
                        </Card.Title>
                    </>
                }
            </Card>
            <View style={
                {
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "center"
                }
            }>
                <Icon
                    onPress={onPrevButtonPress}
                    name="chevron-left"
                    reverse
                />
                <Icon
                    onPress={onCheckButtonPress}
                    name="check" reverse/>
                <Icon
                    onPress={onNextButtonPress}
                    name="chevron-right"
                    reverse
                />
            </View>
        </>
    );
};

export default observer(PhraseList);