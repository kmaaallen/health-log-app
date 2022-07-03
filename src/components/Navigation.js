import React from 'react';
//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//Screens
import LogPage from '../screens/LogPage';
import NewHabit from '../screens/NewHabit';
import EditHabit from '../screens/EditHabit';
import Report from '../screens/Report';
//Theme
import { withTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Log') {
                        iconName = focused ? 'list-circle' : 'list-circle-outline';
                    } else if (route.name === 'New') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                //tabBarActiveTintColor: props.theme.colors.primary, to fix
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Log" component={LogPage} />
            <Tab.Screen name="New" component={NewHabit} />
        </Tab.Navigator>
    )
}

export const StackNavigation = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Health Log Tracker" component={TabNavigation} />
            <Stack.Screen name="Edit" component={EditHabit} />
            <Stack.Screen name="Report" component={Report} />
        </Stack.Navigator>
    )
}


export default withTheme(StackNavigation);

