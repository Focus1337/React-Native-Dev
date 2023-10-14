import MainScreen from "./screens/MainScreen";
import TodoItemScreen from "./screens/TodoItemScreen";
import DoneListScreen from "./screens/DoneListScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NativeStackParamList} from "./types";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import store from "./redux/store";
import {StatusBar} from "react-native";

const Stack = createNativeStackNavigator<NativeStackParamList>();

function App() {
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

export default App;