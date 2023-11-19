import React from "react";
import {SafeAreaView, StyleSheet, Text} from "react-native";

type GenericViewProps = {
    text: string
}
export const GenericView = ({text}: GenericViewProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textStyle}>{text}</Text>
        </SafeAreaView>
    );
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#121212"
    },

    textStyle: {
        fontSize: 24,
        color: 'white',
    }
});
