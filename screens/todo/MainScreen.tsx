import {Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {TodoList} from "../../components/todo/TodoList";
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';
import {MainScreenProps} from "../../utils/types";
import CustomButton from "../../components/CustomButton";
import React, {useEffect, useRef, useState} from "react";
import {useRootStore} from "../../hooks/useRootStore";
import {observer} from "mobx-react";
import {TodoModel} from "../../modules/todo/TodoModel";
import {Skeleton, SkeletonGroup} from "react-native-skeleton-loaders";
import {Modalize} from "react-native-modalize";
import {TouchableOpacity} from "react-native";
import TodoItem from "../../components/todo/TodoItem";

export const MainScreen = observer(({navigation}: MainScreenProps) => {
    let [title, setTitle] = useState<string>('');
    let {todoViewModel, logsStore} = useRootStore();
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
        todoViewModel.actionHandleGetTodos();
    }, []);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const handleAddTodoItem = async () => {
        if (title === '') return;
        const newTodoItemData: TodoModel = {
            id: uuidv4(),
            title: title,
            completed: false,
        };
        todoViewModel.actionHandleAddTodo(newTodoItemData);
        await logsStore.actionHandleAddLog("Add", newTodoItemData.title);
        setTitle('');
    };

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

    const handleNavigationToLogs = () => navigation.navigate('Logs');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>New Tasks</Text>
            {todoViewModel.isLoading ? <LoadingContent/> :
                <TodoList todos={todoViewModel.todoModel.slice().filter(item => !item.completed)}/>}
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} multiline={true} placeholder='Make a sandwich' value={title}
                           onChangeText={newText => setTitle(newText)}/>
                <View style={{alignItems: 'center'}}>
                    <CustomButton title="ADD" onPress={handleAddTodoItem}/>
                    <TouchableOpacity onPress={onOpen}>
                        <Text style={styles.modalText}>Show completed</Text>
                    </TouchableOpacity>
                    <CustomButton title="Logs" onPress={handleNavigationToLogs}/>
                </View>
            </View>

            <Modalize ref={modalizeRef} modalTopOffset={200} adjustToContentHeight={true}
                      HeaderComponent={<View>
                          <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{'Completed Tasks'}</Text>
                      </View>}
                      disableScrollIfPossible={false}
                      modalStyle={{borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingVertical: 10}}
                      flatListProps={{
                          data: todoViewModel.todoModel.slice().filter(item => item.completed),
                          keyExtractor: (_, index) => index.toString(),
                          renderItem: (({item, index}) =>
                              <TodoItem listId={index} item={item} remove={handleRemoveTodoItem}/>),
                          showsVerticalScrollIndicator: false,
                      }}/>

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
        paddingVertical: 10,
        paddingHorizontal: 40,
    },

    modalText: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
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
