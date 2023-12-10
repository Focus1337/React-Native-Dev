import React, {useEffect} from 'react';
import {Linking, StatusBar} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {MainScreen} from "./screens/todo/MainScreen";
import {TodoItemScreen} from "./screens/todo/TodoItemScreen";
import {DoneListScreen} from "./screens/todo/DoneListScreen";
import {NativeStackParamList} from "./utils/types";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LogsScreen} from "./screens/log/LogsScreen";
import Navigation from "./utils/navigation/Navigation";
import {DeepLinking} from "./utils/navigation/DeepLinking";

const Stack = createNativeStackNavigator<NativeStackParamList>();
export default function App() {
    useEffect(() => {
        Linking.getInitialURL().then(async deepLinkInitialURL => {
            if (deepLinkInitialURL) {
                await DeepLinking.handleInitialNavigate(deepLinkInitialURL);
            }
        });
    }, []);

    return (
        <NavigationContainer linking={DeepLinking.linking} ref={Navigation.navigationRef}>
            <Stack.Navigator initialRouteName={'Main'}>
                <Stack.Screen name={'Main'} component={MainScreen} options={{headerShown: false}}/>
                <Stack.Screen name={'TodoItem'} component={TodoItemScreen}
                              options={({route}) =>
                                  ({title: `Task ${route.params.itemId}`})}/>
                <Stack.Screen name={'DoneList'} component={DoneListScreen} options={{headerShown: false}}/>
                <Stack.Screen name={'Logs'} component={LogsScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
        </NavigationContainer>
    );
}
