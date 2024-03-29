import React, {FC, useEffect} from 'react';
import {Button, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreenParams} from "../../App";
import phraseStore from "../stores/PhraseStore";
import {observer} from "mobx-react-lite";
import {Icon} from "@rneui/themed";

export type HomeProps = NativeStackScreenProps<StackScreenParams, "Home">;

interface IHomeComponent {
    navigation: HomeProps["navigation"];
}

const Home: FC<IHomeComponent> = ({ navigation }) => {

    const { phrases } = phraseStore;

    useEffect(() => {
        phraseStore.initPhrases();
    }, []);

    const onPhrasesBackButtonPress = () => {
        phraseStore.saveTranslatedPhrases(phraseStore.initPhrases);
        navigation.pop();
    }

    const isPhrasesEmpty = () => {
        return phrases.length === 0;
    }

    const onStartButtonPress = () => {
        navigation.navigate("Phrases", { phrases: phrases });
    }

    const onAddIconPress = () => {
        navigation.navigate("AddPhraseForm");
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
            <Icon
                onPress={() => onAddIconPress()}
                name="plus" type="font-awesome"
                reverse
            />
            <Button
                title="Start learning"
                onPress={() => onStartButtonPress()}
                disabled={isPhrasesEmpty()}
            />
        </View>
    );
};

export default observer(Home);