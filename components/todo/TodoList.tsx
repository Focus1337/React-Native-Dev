import {FlatList, StyleSheet, Text, View} from "react-native";
import TodoItem from "./TodoItem";
import {TodoModel} from "../../models/TodoModel";

interface TodoListProps {
    todos: TodoModel[],
    doneTodos: boolean
}

export function TodoList({todos, doneTodos}: TodoListProps) {
    return (
        <View style={styles.container}>
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{doneTodos ? 'Completed Tasks' : 'New Tasks'}</Text>
            <FlatList
                data={todos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>
                    <TodoItem listId={index} id={item.id} title={`${item.title}`} done={doneTodos}/>}
            />
        </View>
    );
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});