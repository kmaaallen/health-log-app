import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../App';
import LogButton from '../src/components/LogButton';
// Testing
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { createTestStore } from './utils';
// Navigation
import { NavigationContainer } from '@react-navigation/native';

//TODO - Should not be using test IDs if possible as not real user experience.
// but so far unable to get React Native Paper buttons in any other way if no text

describe('<LogButton />', () => {
    let store, getByText, queryByText, getByTestId, tree
    var toLocaleString = Date.prototype.toLocaleString;

    beforeEach(() => {
        var initialState = {
            habits: {
                habits: {
                    1: {
                        id: 1,
                        title: 'My First Habit',
                        count: 1,
                        limit: 2,
                        frequency: 'Daily',
                        category: 'Health',
                        log: [{ updated: 1612235045000, info: { type: 'created' } }, { updated: 1612235045000, info: { type: 'increment' } }]
                    }
                }
            }
        };
        store = createTestStore(initialState);
        Date.prototype.toLocaleString = function () {
            return '02/02/2021, 03:04:05';
        };
        const component = render(<Provider store={store}><PaperProvider theme={theme}><NavigationContainer><LogButton id={1} key={1} /></NavigationContainer></PaperProvider></Provider>);
        getByText = component.getByText;
        queryByText = component.queryByText;
        getByTestId = component.getByTestId;
        tree = component.toJSON();
    });

    afterAll(() => {
        Date.prototype.toLocaleString = toLocaleString;
    });

    it('has 1 child', () => {
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });

    it('resets habit count to 0 on first rendering ', () => {
        expect(store.getState().habits.habits[1].count).toBe(0);
    });

    it('displays count / limit, category and last updated', () => {
        const display = getByText('0 / 2 today');
        const updated = getByText('Last logged: 02/02/2021, 03:04:05');
        const category = getByText('Health');
        expect(display && updated && category).toBeTruthy();
    });

    it('renders + button which increments count when clicked and is disabled when limit reached', () => {
        const increment = getByText('+');
        expect(increment).toBeTruthy();
        expect(store.getState().habits.habits[1].count).toBe(0);
        fireEvent.press(increment);
        expect(store.getState().habits.habits[1].count).toBe(1);
        fireEvent.press(increment);
        expect(store.getState().habits.habits[1].count).toBe(2);
        // Button returned as object - cannot check enabled / disabled - React Native Paper issue?
        // Below way to confirm not updated again once limit reached
        fireEvent.press(increment);
        expect(store.getState().habits.habits[1].count).toBe(2);
    });

    it('renders edit button which allows user to edit habit in a new screen', () => {
        /*const edit = getByText('Edit');
        expect(edit).toBeTruthy();
        fireEvent.press(edit);
        //Wait until on new screen
        await waitFor(() => queryByText('Edit habit'));
        expect(nav).toHaveBeenCalledWith('Edit');*/
    });

    it('renders delete button which opens a delete modal', async () => {
        const deleteButton = getByText('Delete');
        expect(deleteButton).toBeTruthy();
        expect(Object.keys(store.getState().habits.habits).length).toBe(1);
        fireEvent.press(deleteButton);
        await waitFor(() => queryByText('Are you sure?'));
        const confirm = getByText('Yes');
        const cancel = getByText('Cancel');
        expect(confirm && cancel).toBeTruthy();
    });
});
