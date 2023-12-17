import {Alert, SafeAreaView, Text, View} from "react-native";
import {TodoItemScreenProps} from "../../utils/types";
import CustomButton from "../../components/CustomButton";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useRootStore} from "../../hooks/useRootStore";
import {TodoModel} from "../../modules/todo/TodoModel";
import {useTheme} from "../../hooks/useTheme";
import {useStyles} from "../../hooks/useStyles";

export const TodoItemScreen = observer(({navigation, route}: TodoItemScreenProps) => {
    const {todoViewModel, logsStore} = useRootStore();
    let [currentItem, setCurrentItem] = useState<TodoModel | null>(null);
    let todoList = todoViewModel.todoModel;
    const {Colors} = useTheme();
    const styles = useStyles(Colors);

    useEffect(() => {
        if (todoList.length > 0) {
            let foundItem = todoList.find(item => item.id === route.params.itemId);
            setCurrentItem(foundItem !== undefined ? foundItem : null);
        }
    }, [todoList]);

    const handleRemoveTodoItem = async () => {
        try {
            if (currentItem === null)
                return;

            todoViewModel.actionHandleRemoveTodo(route.params.itemId);
            await logsStore.actionHandleAddLog("Rm", currentItem.title);

            if (navigation.canGoBack())
                navigation.goBack();

        } catch (reason: any) {
            Alert.alert(reason.name, reason.message);
        }
    };

    const handleCompleteTodoItem = async () => {
        try {
            if (currentItem === null)
                return;

            todoViewModel.actionHandleMarkAsComplete(route.params.itemId);
            await logsStore.actionHandleAddLog("MarkAsDone", currentItem.title);
        } catch (reason: any) {
            Alert.alert(reason.name, reason.message);
        }
    };

    return (
        currentItem && (<SafeAreaView style={styles.container}>
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
                    <Text style={styles.primaryText}>Created at [unavailable]</Text>
                </View>
            </View>

            <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
                <CustomButton onPress={handleCompleteTodoItem} title={currentItem.completed ? 'Undone' : 'Mark Done'}/>
                <CustomButton onPress={handleRemoveTodoItem} title={'Delete'}/>
            </View>
        </SafeAreaView>)
    );
});