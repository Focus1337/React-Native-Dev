import FirstTask from "./tasks/FirstTask";
import SecondTask from "./tasks/SecondTask";
import ThirdTask from "./tasks/ThirdTask";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FourthTask from "./tasks/FourthTask";

const Tab = createBottomTabNavigator();

function App() {
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
}

export default App;