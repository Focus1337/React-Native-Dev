import {GestureResponderEvent, Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import {useTheme} from "../hooks/useTheme";
import {useStyles} from "../hooks/useStyles";

interface IButtonProps {
    onPress: (event: GestureResponderEvent) => void,
    title: string
}

export default function Button(props: IButtonProps) {
    const {onPress, title = 'Save'} = props;
    const {Colors} = useTheme();
    const styles = useStyles(Colors);

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
}
