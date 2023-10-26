import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {TodoList} from "../../components/todo/TodoList";
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';
import {MainScreenProps} from "../../utils/types";
import CustomButton from "../../components/CustomButton";
import React, {useEffect, useState} from "react";
import {useRootStore} from "../../hooks/useRootStore";
import {observer} from "mobx-react";
import {TodoModel} from "../../modules/todo/TodoModel";
import {Skeleton, SkeletonGroup} from "react-native-skeleton-loaders";

export const MainScreen = observer(({navigation}: MainScreenProps) => {
    let [title, setTitle] = useState<string>('');
    let {todoViewModel, logsStore} = useRootStore();

    useEffect(() => {
        todoViewModel.getObjectFromService();
    }, []);

    const handleAddTodoItem = () => {
        if (title === '') return;
        const newTodoItemData: TodoModel = {
            id: uuidv4(),
            title: title,
            completed: false,
        };
        todoViewModel.actionHandleAddTodo(newTodoItemData);
        logsStore.actionAddLog(`[Add]: ${newTodoItemData.title}`);
        setTitle('');
    };

    const handleNavigationToCompletedTasks = () => navigation.navigate('DoneList');
    const handleNavigationToLogs = () => navigation.navigate('Logs');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>New Tasks</Text>
            {todoViewModel.isLoading ? <LoadingContent/> :
                <TodoList todos={todoViewModel.todoModel.slice().filter(item => !item.completed)}/>}
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

const LoadingContent = () => {
    return (
        <ScrollView style={{flex: 1}}>
            <SkeletonGroup numberOfItems={19} direction={"column"}>
                <Skeleton w={390} h={30} mX={10}/>
            </SkeletonGroup>
        </ScrollView>
    );
};

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