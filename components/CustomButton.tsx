import {GestureResponderEvent, Pressable, StyleSheet, Text} from "react-native";
import React from "react";

interface customButtonProps {
    onPress: (event: GestureResponderEvent) => void,
    title: string
}

export default function CustomButton(props: customButtonProps) {
    const {onPress, title = 'Save'} = props;

    return (
        <Pressable style={styles.customButton} onPress={onPress}>
            <Text style={styles.customButtonText}>{title}</Text>
        </Pressable>
    );
}

let styles = StyleSheet.create({
    customButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 32,
        borderRadius: 8,
    },

    customButtonText: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
});