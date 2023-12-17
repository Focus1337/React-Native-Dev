import {StyleSheet} from "react-native";
import {IColors} from "../modules/theme/IColors";

export const useStyles = (colors: IColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingBottom: 20,
            backgroundColor: colors.backgroundPrimary
        },

        inputContainer: {
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 40,
        },

        textInput: {
            marginBottom: 10,
            padding: 4,
            minWidth: 80,
            borderWidth: 1,
            borderRadius: 8,
            borderStyle: "solid",
            borderColor: colors.borderPrimary,
            color: colors.textPrimary,
            fontFamily: "Benzin-Regular"
        },

        screenHeader: {
            alignSelf: 'center',
            color: colors.textPrimary,
            fontFamily: "Benzin-Semibold"
        },

        todoContainer: {
            marginHorizontal: 20,
            marginTop: 50,
            padding: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.borderPrimary,
        },

        todoTitle: {
            marginBottom: 12,
            color: colors.textPrimary,
            fontFamily: "Benzin-Regular"
        },

        todoText: {
            fontSize: 20,
            color: colors.textPrimary,
            fontFamily: "Benzin-Regular"
        },

        todoMetadata: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        primaryText: {
            color: colors.textPrimary,
            fontFamily: "Benzin-Regular"
        },

        secondaryText: {
            color: colors.textSecondary,
            fontFamily: "Benzin-Regular"
        },

        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 6,
            paddingHorizontal: 32,
            borderRadius: 8,
        },

        buttonText: {
            color: colors.textPrimary,
            fontFamily: "Benzin-Medium"
        },

        completedTodoText: {
            color: 'seagreen',
            fontFamily: "Benzin-Regular"
        },

        notCompletedTodoText: {
            color: 'coral',
            fontFamily: "Benzin-Regular"
        }
    });