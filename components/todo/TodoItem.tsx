import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import {MainScreenProps} from "../../utils/types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {TodoModel} from "../../modules/todo/TodoModel";

interface TodoItemProps {
    listId: number,
    item: TodoModel,
    remove: (id: string) => Promise<void>
}

export default function TodoItem({listId, item, remove}: TodoItemProps) {
    const navigation = useNavigation<MainScreenProps['navigation']>();

    return (
        <View style={[styles.todoItem, item.completed ? {borderColor: 'seagreen'} : {borderColor: 'coral'}]}>
            <TouchableOpacity style={styles.textContainer}
                              onPress={() => navigation.navigate('TodoItem', {itemId: item.id})}>
                <Text style={styles.todoId}>{`${listId})`}</Text>
                <Text style={[item.completed ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'},
                    styles.todoText]}>{item.title.slice(0, 44) + (item.title.length > 44 ? '...' : '')}</Text>
            </TouchableOpacity>
            <View>
                <Icon.Button name="delete" size={20} color={"black"} onPress={() => remove(item.id)}
                             backgroundColor='transparent'/>
            </View>
        </View>
    );
}

let styles = StyleSheet.create({
    todoItem: {
        flexDirection: "row",
        justifyContent: 'space-between',
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
        marginRight: 12,
        color: 'black',
    },
});
