import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NativeStackParamList} from "../types";
import {Provider} from "react-redux";
import store from "../redux/store";
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "../screens/todo-screens/MainScreen";
import TodoItemScreen from "../screens/todo-screens/TodoItemScreen";
import DoneListScreen from "../screens/todo-screens/DoneListScreen";
import {StatusBar} from "react-native";

const Stack = createNativeStackNavigator<NativeStackParamList>();

export default function Hw3EntryPoint() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Main'}>
                    <Stack.Screen name={'Main'} component={MainScreen} options={{headerShown: false}}/>
                    <Stack.Screen name={'TodoItem'} component={TodoItemScreen}
                                  options={({route}) =>
                                      ({title: `Task ${route.params.itemId}`})}/>
                    <Stack.Screen name={'DoneList'} component={DoneListScreen} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
        </Provider>
    );
}