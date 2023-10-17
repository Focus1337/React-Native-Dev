import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StackParamList} from "../types";
import {StatusBar} from "react-native";
import {AboutScreen} from "../screens/stack-screens/AboutScreen";
import {TabContainerScreen} from "../screens/stack-screens/TabContainerScreen";

const Stack = createNativeStackNavigator<StackParamList>();

export const Hw4EntryPoint = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={'Tab'} component={TabContainerScreen}/>
                <Stack.Screen name={'About'} component={AboutScreen}/>
            </Stack.Navigator>
            <StatusBar barStyle={'light-content'} backgroundColor={"#121212"}/>
        </NavigationContainer>
    );
}