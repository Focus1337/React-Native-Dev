import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {TodoItemScreenProps} from "../../types";
import CustomButton from "../../components/CustomButton";
import {useEffect, useState} from "react";
import ITodoItem from "../../models/ITodoItem";
import {observer} from "mobx-react";
import {useRootStore} from "../../hooks/useRootStore";

export const TodoItemScreen = observer(({navigation, route}: TodoItemScreenProps) => {
    const {todoStore, logsStore} = useRootStore();
    let [currentItem, setCurrentItem] = useState<ITodoItem>(null);

    let todoList = todoStore.todoList;

    useEffect(() => {
        if (todoList.length > 0) {
            setCurrentItem(todoList.find(item => item.id == route.params.itemId));
        }
    }, [todoList]);

    const handleRemoveTodoItem = () => {
        todoStore.actionRemoveTodo(route.params.itemId);
        logsStore.actionAddLog(`[Rm]: ${currentItem.title}`);

        if (navigation.canGoBack())
            navigation.goBack();
    };

    const handleCompleteTodoItem = () => {
        todoStore.actionMarkAsDone(route.params.itemId);
        logsStore.actionAddLog(`[MarkAsDone]: ${currentItem.title}`);
    };

    return (
        currentItem && (<SafeAreaView style={styles.viewContainer}>
            <View style={styles.imageContainer}>

            </View>

            <View style={styles.todoContainer}>
                <View style={styles.todoTitle}>
                    <Text
                        style={[currentItem.isDone ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'},
                            styles.todoText]}>{currentItem.title}</Text>
                </View>
                <View style={styles.todoMetadata}>
                    {
                        currentItem.isDone ?
                            <Text style={{color: 'seagreen'}}>Completed</Text>
                            :
                            <Text style={{color: 'coral'}}>Not completed</Text>
                    }
                    <Text>Created at {currentItem.createdDate}</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <CustomButton onPress={handleCompleteTodoItem} title={currentItem.isDone ? 'Undone' : 'Mark Done'}/>
                <CustomButton onPress={handleRemoveTodoItem} title={'Delete'}/>
            </View>
        </SafeAreaView>)
    );
});

let styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },

    todoContainer: {
        marginHorizontal: 20,
        marginTop: 50,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black'
    },

    todoTitle: {
        marginBottom: 12
    },

    todoText: {
        fontSize: 20,
    },

    todoMetadata: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    imageContainer: {},
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});