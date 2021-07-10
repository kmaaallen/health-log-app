import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Redux
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import LogPage from './src/screens/LogPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Log" component={LogPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
