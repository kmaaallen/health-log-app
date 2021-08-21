import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
//Redux
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import LogPage from './src/screens/LogPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Log" component={LogPage} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
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
