import {HomeScreen} from "../tab-screens/HomeScreen";
import {NewsScreen} from "../tab-screens/NewsScreen";
import {ChatScreen} from "../tab-screens/ChatScreen";
import {SettingsScreen} from "../tab-screens/SettingsScreen";
import {BottomTabNavigationOptions, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TabParamList, TabScreenProps} from "../../types";
import {useNavigation} from "@react-navigation/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabContainerScreen = () => {
    let handleTabOptions = () => {
        let navigation = useNavigation<TabScreenProps['navigation']>();

        let handleNavigation = () => {
            navigation.navigate('About');
        };

        let tabOptions: BottomTabNavigationOptions = {
            headerStyle: {backgroundColor: "#121212"},
            headerTintColor: 'white',
            headerRight: ({tintColor}) => (
                <Icon.Button name="information-outline" onPress={handleNavigation} size={25} color={tintColor}
                             backgroundColor='transparent'/>),
            headerTitle: ({tintColor}) => <MaterialCommunityIcons name={"all-inclusive"} color={tintColor} size={40}/>,
            headerTitleAlign: 'center',
            tabBarStyle: {backgroundColor: "#121212"},
            tabBarActiveTintColor: 'white',
            tabBarShowLabel: false
        };
        return tabOptions;
    }

    let screenOptions = (iconName: string, headerShown = false) => ({
        headerShown: headerShown,
        tabBarIcon: ({color, size}) => <MaterialCommunityIcons name={iconName} color={color} size={size}/>
    });

    return (
        <Tab.Navigator screenOptions={() => handleTabOptions()}>
            <Tab.Screen name={"Home"} component={HomeScreen}
                        options={{...screenOptions('home-outline', true)}}/>
            <Tab.Screen name={"News"} component={NewsScreen} options={screenOptions("newspaper-variant-outline")}/>
            <Tab.Screen name={"Chat"} component={ChatScreen} options={screenOptions("chat-outline")}/>
            <Tab.Screen name={"Settings"} component={SettingsScreen} options={screenOptions("account-cog-outline")}/>
        </Tab.Navigator>
    );
}