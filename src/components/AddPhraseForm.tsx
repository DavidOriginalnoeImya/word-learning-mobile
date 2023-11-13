import React, {useEffect, useState} from 'react';
import {Button, TextInput, View} from "react-native";
import translator from "../utils/Translator";
import {observer} from "mobx-react-lite";

const AddPhraseForm = () => {
    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    useEffect(() => {
        const onTimeout = setTimeout(() =>
            translator.translateString(sourceText, setTranslatedText),
            500
        );

        return () => clearTimeout(onTimeout);
    }, [sourceText]);

    const onSaveButtonPress = () => {
        translator.saveTranslation(sourceText, translatedText);
    }

    return (
        <View style={mainViewStyle}>
            <TextInput
                value={sourceText}
                onChangeText={setSourceText}
            />
            <TextInput
                value={translatedText}
                onChangeText={setTranslatedText}
            />
            <Button
                title="Save"
                onPress={onSaveButtonPress}
            />
        </View>
    );
};

const mainViewStyle = {
    margin: 5
}

export default AddPhraseForm;