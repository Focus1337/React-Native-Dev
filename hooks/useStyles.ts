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
            color: colors.textPrimary
        },

        screenHeader: {
            alignSelf: 'center',
            fontWeight: 'bold',
            color: colors.textPrimary
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
            color: colors.textPrimary
        },

        todoText: {
            fontSize: 20,
            color: colors.textPrimary
        },

        todoMetadata: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        primaryText: {
            color: colors.textPrimary
        },

        secondaryText: {
            color: colors.textSecondary
        }
    });