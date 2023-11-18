import React, {FC} from 'react';
import {Icon} from "@rneui/themed";
import {View} from "react-native";

interface IPhraseNavigationPanelComponent {
    onSavePhrasePress: () => void;
    onDropPhrasePress: () => void;
    onCheckPhrasePress: () => void;
}

const PhraseNavigationPanel: FC<IPhraseNavigationPanelComponent> =
    ({ onCheckPhrasePress, onSavePhrasePress, onDropPhrasePress }) => {
    return (
        <View style={
            {
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center"
            }
        }>
            <Icon
                onPress={onDropPhrasePress}
                name="minus" type="font-awesome"
                reverse
            />
            <Icon
                onPress={onCheckPhrasePress}
                name="check" reverse/>
            <Icon
                onPress={onSavePhrasePress}
                name="plus" type="font-awesome"
                reverse
            />
        </View>
    );
};

export default PhraseNavigationPanel;