import {Button, View, Text} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as React from 'react';

const Stack = createNativeStackNavigator();

export default function FourthTask() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Home'} component={HomeScreen}/>
            <Stack.Screen name={'About'} component={AboutScreen}/>
        </Stack.Navigator>
    );
}

function HomeScreen({navigation}) {
    return (
        <View>
            <Text>Home screen!</Text>
            <Button onPress={() => navigation.navigate('About')}
                    title="About"/>
        </View>
    );
}

function AboutScreen({navigation}) {
    return (
        <View>
            <Text>About screen!</Text>
            <Button title="Go back"
                    onPress={() => navigation.goBack()}/>
        </View>
    );
}