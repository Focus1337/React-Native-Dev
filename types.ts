import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type NativeStackParamList = {
    Main: undefined;
    TodoItem: { itemId: string };
    DoneList: undefined;
};

export type TodoItemScreenProps = NativeStackScreenProps<NativeStackParamList, 'TodoItem'>;
export type MainScreenProps = NativeStackScreenProps<NativeStackParamList, 'Main'>;
export type DoneListScreenProps = NativeStackScreenProps<NativeStackParamList, 'DoneList'>;
