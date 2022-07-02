import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../App';
import EditHabit from '../src/screens/EditHabit';
// Testing
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { screen } from '@testing-library/dom';
import renderer from 'react-test-renderer';
import { createTestStore } from './utils';
// Navigation
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { getByPlaceholderText } from '@testing-library/dom';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import StackNavigation from '../src/components/Navigation';

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        useRoute: () => ({
            params: {
                habit: 1
            }
        }),
    };
});


/*
jest.mock('@react-navigation/native-stack', () => ({
    ...jest.requireActual('@react-navigation/native-stack'),
    createNativeStackNavigator: () => {
        return jest.fn();
    }
}));
jest.mock('@react-navigation/bottom-tabs', () => ({
    ...jest.requireActual('@react-navigation/bottom-tabs'),
    createBottomTabNavigator: () => {
        return jest.fn();
    }
}));
*/
//WHY STORE NOT ACCESSIBLE - TBC FOR REMAINING TESTS TO PASS

describe('<EditHabit />', () => {
    let stockedStore;

    beforeEach(() => {
        let initialState = {
            habits: {
                habits: {
                    1: {
                        id: 1,
                        title: 'My test habit',
                        count: 0,
                        limit: '3',
                        category: 'Health',
                        log: [{ updated: 1612235045000, info: { type: 'created' } }]
                    },
                }
            }
        };
        stockedStore = createTestStore(initialState);
    });
    /*
        it('has 1 child', () => {
            const tree = renderer.create(<Provider store={stockedStore} ><PaperProvider theme={theme}><EditHabit /></PaperProvider></Provider>).toJSON();
            expect(tree.children.length).toBe(1);
        });
    */
    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={stockedStore} ><PaperProvider theme={theme}><EditHabit /></PaperProvider></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders edit habit form title, limit, category inputs and save button with values from habit loaded', async () => {
        // Paper provider component wrapper required for react-native-paper, provided at app level
        // const { getByText, getByTestId } = render(<Provider store={stockedStore}><PaperProvider theme={theme}><NavigationContainer><EditHabit navigation={{ navigate: jest.fn() }} /></NavigationContainer></PaperProvider></Provider>);
        const { getByTestId, getByText } = render(<Provider store={stockedStore}><PaperProvider theme={theme}><NavigationContainer><EditHabit /></NavigationContainer></PaperProvider></Provider>);
        // Expected form inputs on first load
        const title = getByTestId('title-input');
        const limit = getByTestId('limit-input');
        const category = getByTestId('category-input');
        const save = getByText('Save');
        // Inputs to be present
        expect(title && limit && category && save).toBeTruthy();



        /*
         
         // Expect values to be set
         //expect(category.props.items[category.props.selectedIndex].label).toBe(storeCategory);
         expect(title).toBe(store.getState().habits.habits[1].title);
         // expect(limit).toBe(storeLimit);*/
    });
    /*
        it('renders additional new category input when category changes to New category option', async () => {
            // Paper provider component wrapper required for react-native-paper, provided at app level
            const { getByTestId, queryByTestId } = render(<Provider store={stockedStore}><PaperProvider theme={theme}><EditHabit /></PaperProvider></Provider>);
            // Get category input
            const category = getByTestId('category-input');
            // Change category input to 'New category'
            fireEvent(category, 'onValueChange', 'New category');
            // Expect category picker to be "New category" && expecting new category text input to be visible
            expect(category.props.items[category.props.selectedIndex].label).toBe('New category');
            await waitFor(() => queryByTestId('new-category'));
            expect(getByTestId('new-category')).toBeTruthy();
        });
    
        it('allows users to select from an existing category', async () => {
            // Paper provider component wrapper required for react-native-paper, provided at app level
            const { getByTestId, queryByTestId } = render(<Provider store={stockedStore}><PaperProvider theme={theme}><EditHabit /></PaperProvider></Provider>);
            // Expecting category input to contain existing Health option
            expect(getByTestId('category-input').props.items.length).toBe(3);
            expect((queryByTestId('category-input').props.items[2].label)).toBe('Health');
        });
    */
    it('allows users to save updates to an existing new habit and return to log page', async () => {
        const nav = jest.fn();
        // Paper provider component wrapper required for react-native-paper, provided at app level
        const { getByTestId, queryByTestId, getByText } = render(<Provider store={stockedStore} ><PaperProvider theme={theme}><NavigationContainer><EditHabit navigation={{ navigate: nav }} /></NavigationContainer></PaperProvider></Provider>);
        // Expecting category input to not contain one non-default options as one habit in store
        expect(getByTestId('category-input').props.items.length).toBe(3);
        // Submit new habit under new category
        const title = getByTestId('title-input');
        const limit = getByTestId('limit-input');
        const category = getByTestId('category-input');
        const submit = getByText('Save');
        fireEvent.changeText(title, 'My edited habit');
        fireEvent.changeText(limit, '6');
        console.log(title);
        fireEvent(category, 'onValueChange', 'New category');
        await waitFor(() => queryByTestId('new-category'));
        fireEvent.changeText(getByTestId('new-category'), 'Fitness');
        await waitFor(() => {
            fireEvent.press(submit);
        });
        // Expect store habit to be updated with new category
        expect(Object.keys(store.getState().habits.habits).length).toBe(1);
        expect(store.getState().habits.habits[1].title).toBe('My edited habit');
        expect(store.getState().habits.habits[1].limit).toBe('6');
        expect(store.getState().habits.habits[1].category).toBe('Fitness');
        expect(nav).toHaveBeenCalledWith('Log');
    });
    /*
        it('validates errors correctly in edit habit form', async () => {
            // Paper provider component wrapper required for react-native-paper, provided at app level
            const { getByText, getByTestId } = render(<Provider store={stockedStore}><PaperProvider theme={theme}><EditHabit /></PaperProvider></Provider>);
            const title = getByTestId('title-input');
            const limit = getByTestId('limit-input');
            const save = getByText('Save');
            fireEvent.changeText(title, '');
            fireEvent.changeText(limit, '');
            await waitFor(() => {
                fireEvent.press(save);
            });
            // Expect store to not be updated and error messages present
            expect(store.getState().habits.habits[1].title).toBe('My test habit');
            expect(store.getState().habits.habits[1].limit).toBe('3');
            expect(getByText('Title is required')).toBeTruthy();
            expect(getByText('Limit is required')).toBeTruthy();
            // change limit value to check other error message and submit form
            fireEvent.changeText(limit, '0');
            await waitFor(() => {
                fireEvent.press(save);
            });
            // Expect store to not be updated and error messages present
            expect(store.getState().habits.habits[1].title).toBe('My test habit');
            expect(store.getState().habits.habits[1].limit).toBe('3');
            expect(getByText('Title is required')).toBeTruthy();
            expect(getByText('Limit must be greater than zero')).toBeTruthy();
        });
    */
});

