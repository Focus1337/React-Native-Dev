import {Button, Text, View} from "react-native";
import {useEffect, useState} from "react";

export default function FirstTask() {
    const [pressedCount, setPressedCount] = useState(0);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if (pressedCount >= 3 && !disable) {
            setDisable(true);
        }
    }, [disable, pressedCount]);

    const buttonHandler = () =>
        setPressedCount(pressedCount + 1);

    const buttonResetHandler = () => {
        setPressedCount(0);
        setDisable(false);
    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{margin: 16}}>
                {pressedCount > 0
                    ? `The button was pressed ${pressedCount} times!`
                    : 'The button isn\'t pressed yet'
                }
            </Text>
            <Button disabled={disable} title='Press me' onPress={buttonHandler}/>
            <Button title="Reset" onPress={buttonResetHandler}/>
        </View>
    );
}