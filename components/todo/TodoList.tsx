import {FlatList, StyleSheet, View} from "react-native";
import TodoItem from "./TodoItem";
import {TodoModel} from "../../modules/todo/TodoModel";

interface TodoListProps {
    todos: TodoModel[],
}

export function TodoList({todos}: TodoListProps) {
    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>
                    <TodoItem listId={index} id={item.id} title={`${item.title}`} done={item.completed}/>}
            />
        </View>
    );
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
