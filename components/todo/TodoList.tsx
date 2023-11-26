import {Alert, FlatList, StyleSheet, View} from "react-native";
import TodoItem from "./TodoItem";
import {TodoModel} from "../../modules/todo/TodoModel";
import {useRootStore} from "../../hooks/useRootStore";

interface TodoListProps {
    todos: TodoModel[]
}

export function TodoList({todos}: TodoListProps) {
    let {todoViewModel, logsStore} = useRootStore();
    const handleRemoveTodoItem = async (id: string) => {
        try {
            let itemToDelete = todoViewModel.todoModel.find(todo => todo.id === id);
            if (itemToDelete) {
                Alert.alert("Delete Todo", "Are you sure?", [{text: "Cancel", style: 'cancel'}, {
                    text: "Delete", onPress: async () => {
                        todoViewModel.actionHandleRemoveTodo(itemToDelete!.id);
                        await logsStore.actionHandleAddLog("Rm", itemToDelete!.title);
                    }
                }]);
            }
        } catch (reason: any) {
            Alert.alert(reason.name, reason.message);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item, index}) =>
                    <TodoItem listId={index} item={item} remove={handleRemoveTodoItem}/>}
            />
        </View>
    );
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
