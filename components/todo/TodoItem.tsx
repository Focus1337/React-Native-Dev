import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {MainScreenProps} from "../../utils/types";
import {useTheme} from "../../hooks/useTheme";
import {useStyles} from "../../hooks/useStyles";

interface TodoItemProps {
    title: string,
    id: string,
    listId: number,
    done: boolean
}

export default function TodoItem({title, id, listId, done}: TodoItemProps) {
    const navigation = useNavigation<MainScreenProps['navigation']>();
    const {Colors} = useTheme();
    const genericStyles = useStyles(Colors);

    return (
        <View style={[styles.todoItem, done ? {borderColor: 'seagreen'} : {borderColor: 'coral'}]}>
            <TouchableOpacity style={styles.textContainer}
                              onPress={() => navigation.navigate('TodoItem', {itemId: id})}>
                <Text style={[styles.todoId, genericStyles.primaryText]}>{`${listId})`}</Text>
                <Text style={[done ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'},
                    styles.todoText, genericStyles.primaryText]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

let styles = StyleSheet.create({
    todoItem: {
        padding: 6,
        borderBottomWidth: 1,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    todoId: {
        marginRight: 6,
        fontWeight: 'bold'
    },

    todoText: {
        marginRight: 12
    },
});
