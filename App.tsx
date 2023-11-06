import React from 'react';
import {View} from "react-native";
import Phrase from "./src/components/Phrase";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import 'react-native-gesture-handler';

const App = () => {
    return (
        <GestureHandlerRootView>
          <Phrase/>
        </GestureHandlerRootView>
    );
};

export default App;