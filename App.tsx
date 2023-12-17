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
import {ThemeProvider} from "./modules/theme/ThemeProvider";
import {useTheme} from "./hooks/useTheme";
import {ThemeTypes} from "./modules/theme/ThemeTypes";

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
        <ThemeProvider>
            <NavigationContainer linking={DeepLinking.linking} ref={Navigation.navigationRef}>
                <Stack.Navigator initialRouteName={'Main'}>
                    <Stack.Screen name={'Main'} component={MainScreen} options={{headerShown: false}}/>
                    <Stack.Screen name={'TodoItem'} component={TodoItemScreen}
                                  options={({route}) =>
                                      ({title: `Task ${route.params.itemId}`})}/>
                    <Stack.Screen name={'DoneList'} component={DoneListScreen} options={{headerShown: false}}/>
                    <Stack.Screen name={'Logs'} component={LogsScreen} options={{headerShown: false}}/>
                </Stack.Navigator>
                <ThemedStatusBar/>
            </NavigationContainer>
        </ThemeProvider>
    );
}

const ThemedStatusBar = () => {
    const {Colors, selectTheme} = useTheme();
    return <StatusBar barStyle={selectTheme == ThemeTypes.LIGHT ? 'dark-content' : 'light-content'}
                      backgroundColor={Colors.backgroundPrimary}/>
}