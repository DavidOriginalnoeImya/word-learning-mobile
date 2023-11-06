import React from 'react';
import {Button, TextInput, View} from "react-native";
import {Card} from '@rneui/themed';

const Phrase = () => {
    return (
        <>
            <Card>
                <Card.Title>Test</Card.Title>
                <Card.Divider/>
                <TextInput/>
            </Card>
            <View style={
                {
                    flexDirection: "row",
                    justifyContent: "center"
                }
            }>
                <Button title="Prev"/>
                <Button title="Next"/>
            </View>
        </>
    );
};

export default Phrase;