import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FirstTask from "../components/tasks/FirstTask";
import SecondTask from "../components/tasks/SecondTask";
import ThirdTask from "../components/tasks/ThirdTask";
import FourthTask from "../components/tasks/FourthTask";

const Tab = createBottomTabNavigator();

export default function Hw2EntryPoint() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{headerShown: false}}>
                <Tab.Screen name={'First'} component={FirstTask}/>
                <Tab.Screen name={'Second'} component={SecondTask}/>
                <Tab.Screen name={'Third'} component={ThirdTask}/>
                <Tab.Screen name={'Fourth'} component={FourthTask}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};