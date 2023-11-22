import React, {FC, useState} from 'react';
import {Card, Icon, Text} from "@rneui/themed";
import {StyleSheet, TextInput, View} from "react-native";
import {IPhrase} from "../stores/PhraseStore";
import isStringsEqual from "../utils/isStringsEqual";
import speaker from "../utils/Speaker";
import {RectButton} from "react-native-gesture-handler";

interface PhraseComponent {
    phrase: IPhrase;
    checked: boolean;
}

const Phrase: FC<PhraseComponent> = ({ phrase, checked }) => {
    const [answer, setAnswer] = useState("");

    const getAnswerColor = () => {
        return isStringsEqual(phrase.translation, answer) ? "green" : "red";
    }

    return (
        <Card containerStyle={styles.card}>
            {
                !checked &&
                <>
                    <RectButton
                        disallowInterruption
                        delayLongPress={1}
                        onLongPress={() => speaker.speak(phrase.phrase)}
                    >
                        <View style={styles.phrase} pointerEvents="none">
                            <Icon
                                name="play" type="font-awesome"
                                style={styles.play_btn}
                            />
                            <Text h1>
                                {phrase.phrase}
                            </Text>
                        </View>
                    </RectButton>
                    <Card.Divider/>
                    <TextInput
                        placeholder="Enter your translation..."
                        onChangeText={setAnswer}
                    />
                </>
            }
            {
                checked &&
                <View style={{...styles.phrase, marginTop: "80%"}}>
                    <Text style={{color: getAnswerColor()}} h3>
                        {phrase.translation}
                    </Text>
                </View>
            }
        </Card>
    );
};

const styles = StyleSheet.create({
    phrase: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    card: {
        flex: 1,
        borderRadius: 20,
        marginBottom: 10
    },
    play_btn: {
        marginRight: 5,
        marginTop: 10
    }
});

export default Phrase;