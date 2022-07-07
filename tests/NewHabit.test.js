import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../App';
import NewHabit from '../src/screens/NewHabit';
// Testing
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { createTestStore } from './utils';
import { NavigationContainer } from '@react-navigation/native';

describe('<NewHabit />', () => {
    let store, stockedStore;
    let initialState = {
        habits: {
            habits: {
                1: {
                    id: 1,
                    title: 'My test habit',
                    count: 0,
                    limit: 3,
                    category: 'Health',
                    frequency: 'Daily',
                    log: [{ updated: 1612235045000, info: { type: 'created' } }]
                },
            }
        }
    };

    beforeEach(() => {
        store = createTestStore();
        stockedStore = createTestStore(initialState);
    });

    it('has 1 child', () => {
        const tree = renderer.create(<Provider store={store} ><NewHabit theme={theme} /></Provider>).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={store} ><NewHabit theme={theme} /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders create new habit form title, limit, category inputs and submit button on first load', () => {
        // Paper provider component wrapper required for react-native-paper, provided at app level
        const { getByText, getByTestId, queryByTestId } = render(<Provider store={store}><PaperProvider theme={theme}><NewHabit /></PaperProvider></Provider>);
        // Expected form inputs on first load
        const title = getByTestId('title-input');
        const limit = getByTestId('limit-input');
        const category = getByTestId('category-input');
        const frequency = getByTestId('frequency-input');
        const submit = getByText('Ok');
        // Inputs to be present
        expect(title && limit && category && frequency && submit).toBeTruthy();
        // Expect category default option to be set to 'Please select a category'
        expect(category.props.items[category.props.selectedIndex].label).toBe('Please select a category');
        // Expect new category text input to be hidden at this stage
        expect(queryByTestId('new-category')).toBeFalsy();
    });

    it('renders additional new category input when category changes to New category option', async () => {
        // Paper provider component wrapper required for react-native-paper, provided at app level
        const { getByTestId, queryByTestId } = render(<Provider store={store}><PaperProvider theme={theme}><NewHabit /></PaperProvider></Provider>);
        // Get category input
        const category = getByTestId('category-input');
        // Change category input to 'New category'
        fireEvent(category, 'onValueChange', 'New category');
        // Expect category picker to be "New category" && expecting new category text input to be visible
        expect(category.props.items[category.props.selectedIndex].label).toBe('New category');
        await waitFor(() => queryByTestId('new-category'));
        expect(getByTestId('new-category')).toBeTruthy();
    });

    it('allows users to select from an existing category', () => {
        const nav = jest.fn();
        // Paper provider component wrapper required for react-native-paper, provided at app level
        const { getByTestId, queryByTestId, getByText } = render(<Provider store={stockedStore}><PaperProvider theme={theme}><NewHabit navigation={{ navigate: nav }} /></PaperProvider></Provider>);
        // Expecting category input to contain existing Health option
        expect(getByTestId('category-input').props.items.length).toBe(3);
        expect((queryByTestId('category-input').props.items[2].label)).toBe('Health');
    });

    it('allows users to submit a new habit', async () => {
        const nav = jest.fn();
        // Paper provider component wrapper required for react-native-paper, provided at app level
        const { getByTestId, queryByTestId, getByText } = render(<Provider store={store}><PaperProvider theme={theme}><NewHabit navigation={{ navigate: nav }} /></PaperProvider></Provider>);
        // Expecting category input to not contain any non-default options as empty store
        expect(getByTestId('category-input').props.items.length).toBe(2);
        // Submit new habit under new category
        const title = getByTestId('title-input');
        const limit = getByTestId('limit-input');
        const category = getByTestId('category-input');
        const frequency = getByTestId('frequency-input');
        const submit = getByText('Ok');
        fireEvent.changeText(title, 'My new habit');
        fireEvent.changeText(limit, '2');
        fireEvent(frequency, 'onValueChange', 'Daily');
        fireEvent(category, 'onValueChange', 'New category');
        await waitFor(() => queryByTestId('new-category'));
        fireEvent.changeText(getByTestId('new-category'), 'Fitness');
        await waitFor(() => {
            fireEvent.press(submit);
        });
        // Expect store to be updated with new habit that has new category
        expect(Object.keys(store.getState().habits.habits).length).toBe(1);
        expect(store.getState().habits.habits[1].title).toBe('My new habit');
        expect(store.getState().habits.habits[1].limit).toBe('2');
        expect(store.getState().habits.habits[1].frequency).toBe('Daily');
        expect(store.getState().habits.habits[1].category).toBe('Fitness');
    });

    it('validates errors correctly in create new habit form', async () => {
        // Paper provider component wrapper required for react-native-paper, provided at app level
        const { getByText, getByTestId, queryByText } = render(<Provider store={store}><PaperProvider theme={theme}><NewHabit /></PaperProvider></Provider>);
        // Expect store to be empty at this stage
        expect(store.getState().habits).toEqual({ "habits": {} });
        const limit = getByTestId('limit-input');
        const submit = getByText('Ok');
        await waitFor(() => {
            fireEvent.press(submit);
        });
        // Expect store to not be updated and error messages present
        expect(Object.keys(store.getState().habits.habits).length).toBe(0);
        expect(getByText('Title is required')).toBeTruthy();
        expect(getByText('Limit is required')).toBeTruthy();
        // change limit value to check other error message and submit form
        fireEvent.changeText(limit, '0');
        await waitFor(() => {
            fireEvent.press(submit);
        });
        // Expect store to not be updated and error messages present
        expect(Object.keys(store.getState().habits.habits).length).toBe(0);
        expect(getByText('Title is required')).toBeTruthy();
        expect(getByText('Limit must be greater than zero')).toBeTruthy();
    });

    it('returns to Log page on successful submission of form', async () => {
        const nav = jest.fn();
        const { getByTestId, getByText, queryByTestId } = render(<Provider store={store}><PaperProvider theme={theme}><NewHabit navigation={{ navigate: nav }} /></PaperProvider></Provider>);
        // Submit new habit under new category
        const title = getByTestId('title-input');
        const limit = getByTestId('limit-input');
        const frequency = getByTestId('frequency-input');
        const category = getByTestId('category-input');
        const submit = getByText('Ok');
        fireEvent.changeText(title, 'My new habit');
        fireEvent.changeText(limit, '2');
        fireEvent(frequency, 'onValueChange', 'Daily');
        fireEvent(category, 'onValueChange', 'New category');
        await waitFor(() => queryByTestId('new-category'));
        fireEvent.changeText(getByTestId('new-category'), 'New thing');
        await waitFor(() => {
            fireEvent.press(submit);
        });
        // Expect store to be updated with new habit that also has category Health
        expect(Object.keys(store.getState().habits.habits).length).toBe(1);
        expect(store.getState().habits.habits[1].title).toBe('My new habit');
        expect(store.getState().habits.habits[1].limit).toBe('2');
        expect(store.getState().habits.habits[1].frequency).toBe('Daily');
        expect(store.getState().habits.habits[1].category).toBe('New thing');
        expect(nav).toHaveBeenCalledWith('Log');
    });
});
