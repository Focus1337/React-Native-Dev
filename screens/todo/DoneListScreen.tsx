import {SafeAreaView, StyleSheet, Text} from "react-native";
import {DoneListScreenProps} from "../../utils/types";
import {TodoList} from "../../components/todo/TodoList";
import CustomButton from "../../components/CustomButton";
import {observer} from "mobx-react";
import {useRootStore} from "../../hooks/useRootStore";

export const DoneListScreen = observer(({navigation}: DoneListScreenProps) => {
    const {todoViewModel} = useRootStore();

    let completedTodos = () => todoViewModel.todoModel.filter(todo => todo.completed);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{'Completed Tasks'}</Text>
            <TodoList todos={completedTodos()}/>
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
