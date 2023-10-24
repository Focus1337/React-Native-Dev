import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {TodoItemScreenProps} from "../../utils/types";
import CustomButton from "../../components/CustomButton";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useRootStore} from "../../hooks/useRootStore";
import {TodoModel} from "../../modules/todo/TodoModel";

export const TodoItemScreen = observer(({navigation, route}: TodoItemScreenProps) => {
    const {todoViewModel, logsStore} = useRootStore();
    let [currentItem, setCurrentItem] = useState<TodoModel>(null);

    let todoList = todoViewModel.todoModel;

    useEffect(() => {
        if (todoList.length > 0) {
            setCurrentItem(todoList.find(item => item.id === route.params.itemId));
        }
    }, [todoList]);

    const handleRemoveTodoItem = () => {
        todoViewModel.actionHandleRemoveTodo(route.params.itemId)
            .then(() => {
                logsStore.actionAddLog(`[Rm]: ${currentItem.title}`);

                if (navigation.canGoBack())
                    navigation.goBack();
            })
            .catch((reason) => {
                alert(reason);
            });
    };

    const handleCompleteTodoItem = () => {
        todoViewModel.actionHandleMarkAsComplete(route.params.itemId)
            .then(() => {
                logsStore.actionAddLog(`[MarkAsDone]: ${currentItem.title}`);
            })
            .catch((reason) => {
                alert(reason);
            });
    };

    return (
        currentItem && (<SafeAreaView style={styles.viewContainer}>
            <View style={styles.imageContainer}>

            </View>

            <View style={styles.todoContainer}>
                <View style={styles.todoTitle}>
                    <Text
                        style={[currentItem.completed ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'},
                            styles.todoText]}>{currentItem.title}</Text>
                </View>
                <View style={styles.todoMetadata}>
                    {
                        currentItem.completed ?
                            <Text style={{color: 'seagreen'}}>Completed</Text>
                            :
                            <Text style={{color: 'coral'}}>Not completed</Text>
                    }
                    <Text>Created at [unavailable]</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <CustomButton onPress={handleCompleteTodoItem} title={currentItem.completed ? 'Undone' : 'Mark Done'}/>
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