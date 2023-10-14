import {SafeAreaView, StyleSheet} from "react-native";
import {DoneListScreenProps} from "../../types";
import {TodoList} from "../../components/todo/TodoList";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/todoSlice";
import CustomButton from "../../components/CustomButton";

export default function DoneListScreen({navigation}: DoneListScreenProps) {
    const todoList = useSelector((state: RootState) => state.todo.todoList);

    return (
        <SafeAreaView style={styles.container}>
            <TodoList todos={todoList.filter(item => item.isDone)} doneTodos={true}/>
            <CustomButton onPress={() => navigation.goBack()} title={'Back to tasks'}/>
        </SafeAreaView>
    );
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        backgroundColor: 'white'
    },
});