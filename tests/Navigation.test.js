import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../App';
import TabNavigation from '../src/components/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createTestStore } from './utils';

describe('<TabNavigation />', () => {
    let store;

    beforeEach(() => {
        store = createTestStore();
    });

    it('has a log button and a home button', () => {
        const { findByText } = render(<Provider store={store}><PaperProvider theme={theme}><NavigationContainer><TabNavigation /></NavigationContainer></PaperProvider></Provider>);
        const logBtn = findByText('Log');
        const newBtn = findByText('New');
        expect(logBtn && newBtn).toBeTruthy();
    });

    it('navigates between screens when navigation tab pressed', async () => {
        const { queryByText, getByText } = render(<Provider store={store}><PaperProvider theme={theme}><NavigationContainer><TabNavigation /></NavigationContainer></PaperProvider></Provider>);
        // start on log screen
        const oldScreen = queryByText('You have 0 active habits');
        const newBtn = getByText('New');
        expect(oldScreen).toBeTruthy();
        // navigate to new habit screen
        fireEvent(newBtn, 'press');
        const newScreen = await queryByText('Create a new habit');
        expect(newScreen).toBeTruthy();
    });
});