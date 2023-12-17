import {SafeAreaView, Text} from "react-native";
import {DoneListScreenProps} from "../../utils/types";
import {TodoList} from "../../components/todo/TodoList";
import CustomButton from "../../components/CustomButton";
import {observer} from "mobx-react";
import {useRootStore} from "../../hooks/useRootStore";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../hooks/useTheme";
import {useStyles} from "../../hooks/useStyles";

export const DoneListScreen = observer(({navigation}: DoneListScreenProps) => {
    const {todoViewModel} = useRootStore();
    const {t} = useTranslation();
    const {Colors} = useTheme();
    const styles = useStyles(Colors);

    let completedTodos = () => todoViewModel.todoModel.filter(todo => todo.completed);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.screenHeader}>{t('completed-tasks.header')}</Text>
            <TodoList todos={completedTodos()}/>
            <CustomButton onPress={() => navigation.goBack()} title={t('completed-tasks.back-button-text')}/>
        </SafeAreaView>
    );
});