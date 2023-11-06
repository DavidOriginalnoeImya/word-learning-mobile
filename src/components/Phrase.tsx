import React, {useState} from 'react';
import {Button, GestureResponderEvent, Text, TextInput, View} from "react-native";
import {Card} from '@rneui/themed';
import {observer} from "mobx-react-lite";
import phraseStore from "../stores/PhraseStore";
import {Swipeable} from "react-native-gesture-handler";

const Phrase = () => {
    const { phrases } = phraseStore;

    const [curPhraseIndex, setCurPhraseIndex] = useState(0);

    if (phrases.length === 0) {
        return <Text>Phrase list is empty</Text>
    }

    const onPrevButtonPress = (e: GestureResponderEvent) => {
        e.preventDefault();

    }


    return (
        <Swipeable
            onSwipeableOpen={
                (direction, swipeable) => {
                    if (direction === "right")
                        setCurPhraseIndex(curPhraseIndex + 1);
                    else
                        setCurPhraseIndex(curPhraseIndex - 1);
                }
            }
        >
            <Card>
                <Card.Title>{phrases[curPhraseIndex].phrase}</Card.Title>
                <Card.Divider/>
                <TextInput/>
            </Card>
            <View style={
                {
                    flexDirection: "row",
                    justifyContent: "center"
                }
            }>
                <Button
                    disabled={curPhraseIndex === 0}
                    onPress={() => setCurPhraseIndex(curPhraseIndex - 1)}
                    title="Prev"
                />
                <Button
                    disabled={curPhraseIndex === phrases.length - 1}
                    title="Next"
                    onPress={() => setCurPhraseIndex(curPhraseIndex + 1)}
                />
            </View>
        </Swipeable>
    );
};

export default observer(Phrase);