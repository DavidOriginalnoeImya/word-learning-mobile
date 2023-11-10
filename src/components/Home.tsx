import React, {FC, useEffect} from 'react';
import {Button, Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreenParams} from "../../App";
import phraseStore from "../stores/PhraseStore";
import {observer} from "mobx-react-lite";

export type HomeProps = NativeStackScreenProps<StackScreenParams, "Home">;

interface IHomeComponent {
    navigation: HomeProps["navigation"];
}

const Home: FC<IHomeComponent> = ({ navigation }) => {

    const { phrases } = phraseStore;

    useEffect(() => {
        phraseStore.initPhrases();
    }, []);

    const isPhrasesEmpty = () => {
        return phrases.length === 0;
    }

    const onStartButtonPress = () => {
        navigation.navigate("Phrases", {phrases: phrases});
    }

    return (
        <View
            style={
                {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }
            }
        >
            <Button
                title="Start learning"
                onPress={() => onStartButtonPress()}
                disabled={isPhrasesEmpty()}
            />
        </View>
    );
};

export default observer(Home);