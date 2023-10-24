import {SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import {TodoList} from "../../components/todo/TodoList";
import ITodoItem from "../../models/ITodoItem";
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';
import {MainScreenProps} from "../../types";
import CustomButton from "../../components/CustomButton";
import React, {useState} from "react";
import {useRootStore} from "../../hooks/useRootStore";
import {observer} from "mobx-react";

export const MainScreen = observer(({navigation}: MainScreenProps) => {
    let [title, setTitle] = useState<string>('');
    let {todoStore, logsStore} = useRootStore();

    const handleAddTodoItem = () => {
        if (title === '') return;
        const newTodoItemData: ITodoItem = {
            id: uuidv4(),
            title: title,
            isDone: false,
            createdDate: new Date().toLocaleDateString()
        };
        todoStore.actionAddTodo(newTodoItemData);
        logsStore.actionAddLog(`[Add]: ${newTodoItemData.title}`);
        setTitle('');
    };

    const handleNavigationToCompletedTasks = () => navigation.navigate('DoneList');
    const handleNavigationToLogs = () => navigation.navigate('Logs');

    return (
        <SafeAreaView style={styles.container}>
            <TodoList todos={todoStore.todoList.slice().filter(item => !item.isDone)} doneTodos={false}/>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} multiline={true} placeholder='Make a sandwich' value={title}
                           onChangeText={newText => setTitle(newText)}/>
                <CustomButton title="ADD" onPress={handleAddTodoItem}/>
                <CustomButton title="Completed tasks" onPress={handleNavigationToCompletedTasks}/>
                <CustomButton title="Logs" onPress={handleNavigationToLogs}/>
            </View>
        </SafeAreaView>
    )
})

let styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: 'white'
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
        borderColor: "black",
    },
});