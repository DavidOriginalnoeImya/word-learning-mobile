import React, {FC, useEffect} from 'react';
import PhraseCard from "./PhraseCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackScreenParams} from "../../App";
import {HeaderBackButton} from "@react-navigation/elements";
import {View} from "react-native";

export type PhraseListProps = NativeStackScreenProps<StackScreenParams, "Phrases">;

interface IPhraseListComponent {
    navigation: PhraseListProps["navigation"];
    route: PhraseListProps["route"];
    onBackButtonPress: () => void;
}

const PhraseList: FC<IPhraseListComponent> = ({ route, navigation, onBackButtonPress }) => {
    const { phrases } = route.params;

    const onBackPress = () => {
        onBackButtonPress();
        navigation.pop();
    }

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
        <View style={{flex: 1}}>
            {
                phrases.map((phrase, index) =>
                    <PhraseCard
                        phrase={phrase}
                        index={phrases.length - index}
                        cardNum={phrases.length}
                    />
                )
            }
        </View>
    );
};

export default PhraseList;