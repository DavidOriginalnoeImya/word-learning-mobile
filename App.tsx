import React from 'react';
import PhraseList from "./src/components/PhraseList";
import 'react-native-gesture-handler';
import phraseStore, {IPhrase} from "./src/stores/PhraseStore";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/components/Home";
import AddPhraseForm from "./src/components/AddPhraseForm";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Phrase} from "./src/model/Phrase";

export type StackScreenParams = {
    Home: undefined;
    Phrases: {
        phrases: Phrase[],
    };
    AddPhraseForm: undefined;
}

const App = () => {

    const Stack = createNativeStackNavigator<StackScreenParams>();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Phrases"
                        options={{ title: "" }}
                    >
                        {
                            (props) =>
                                <PhraseList
                                    {...props}
                                    onBackButtonPress={() =>
                                        phraseStore.saveTranslatedPhrases(phraseStore.initPhrases)
                                    }
                                />
                        }
                    </Stack.Screen>
                    <Stack.Screen
                        name="AddPhraseForm"
                        component={AddPhraseForm}
                        options={{ title: "" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;