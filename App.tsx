import React from 'react';
import PhraseList from "./src/components/PhraseList";
import 'react-native-gesture-handler';
import {IPhrase} from "./src/stores/PhraseStore";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/components/Home";
import AddPhraseForm from "./src/components/AddPhraseForm";

export type StackScreenParams = {
    Home: undefined;
    Phrases: {
        phrases: IPhrase[],
        onBackButtonPress: () => void
    };
    AddPhraseForm: undefined;
}

const App = () => {

    const Stack = createNativeStackNavigator<StackScreenParams>();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Phrases"
                    component={PhraseList}
                    options={{ title: "" }}
                />
                <Stack.Screen
                    name="AddPhraseForm"
                    component={AddPhraseForm}
                    options={{ title: "" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;