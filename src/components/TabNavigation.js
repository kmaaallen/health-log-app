import React from 'react';
//Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//Screens
import LogPage from '../screens/LogPage';
import NewHabit from '../screens/NewHabit';
//Theme
import { withTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export const TabNavigation = (props) => {
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
                tabBarActiveTintColor: props.theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Log" component={LogPage} />
            <Tab.Screen name="New" component={NewHabit} />
        </Tab.Navigator>
    )
}


export default withTheme(TabNavigation);

