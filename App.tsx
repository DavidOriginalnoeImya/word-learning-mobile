import React from 'react';
import {Text, View} from "react-native";
import PhraseList from "./src/components/PhraseList";
import 'react-native-gesture-handler';
import phraseStore from "./src/stores/PhraseStore";
import {observer} from "mobx-react-lite";

const App = () => {

    const { phrases } = phraseStore;

    if (phrases.length === 0) {
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
                <Text>Phrase list is empty</Text>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
          <PhraseList phrases={phrases}/>
        </View>
    );
};

export default observer(App);