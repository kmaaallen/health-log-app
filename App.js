import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
//Redux
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/components/TabNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors
  },
  dialog: {
    margin: '5%',
  },
  spacing: {
    small: '1%',
    medium: '5%'
  }

}
