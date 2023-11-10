import React from 'react';
import PhraseList from "./src/components/PhraseList";
import 'react-native-gesture-handler';
import phraseStore, {IPhrase} from "./src/stores/PhraseStore";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/components/Home";

export type StackScreenParams = {
    Home: undefined;
    Phrases: {phrases: IPhrase[]};
}

const App = () => {

    const { phrases } = phraseStore;

    const Stack = createNativeStackNavigator<StackScreenParams>();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Phrases" component={PhraseList}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;