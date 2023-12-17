import {GestureResponderEvent, Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import {useTheme} from "../hooks/useTheme";
import {useStyles} from "../hooks/useStyles";

interface customButtonProps {
    onPress: (event: GestureResponderEvent) => void,
    title: string
}

export default function CustomButton(props: customButtonProps) {
    const {onPress, title = 'Save'} = props;
    const {Colors} = useTheme();
    const styles = useStyles(Colors);

    return (
        <Pressable style={customStyles.customButton} onPress={onPress}>
            <Text style={[customStyles.customButtonText, styles.primaryText]}>{title}</Text>
        </Pressable>
    );
}

let customStyles = StyleSheet.create({
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
        letterSpacing: 0.25
    },
});
