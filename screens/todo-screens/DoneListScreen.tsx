import {SafeAreaView, StyleSheet} from "react-native";
import {DoneListScreenProps} from "../../types";
import {TodoList} from "../../components/todo/TodoList";
import CustomButton from "../../components/CustomButton";
import {observer} from "mobx-react";
import {useRootStore} from "../../hooks/useRootStore";

export const DoneListScreen = observer(({navigation}: DoneListScreenProps) => {
    const {todoStore} = useRootStore();

    let completedTodos = () => todoStore.todoList.filter(todo => todo.isDone);

    return (
        <SafeAreaView style={styles.container}>
            <TodoList todos={completedTodos()} doneTodos={true}/>
            <CustomButton onPress={() => navigation.goBack()} title={'Back to tasks'}/>
        </SafeAreaView>
    );
});

let styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        backgroundColor: 'white'
    },
});