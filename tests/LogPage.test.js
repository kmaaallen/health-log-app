import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../App';
import LogPage from '../src/screens/LogPage';
// Testing
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createTestStore } from './utils';
import { NavigationContainer } from '@react-navigation/native';


describe('<LogPage />', () => {
    let store, stockedStore, queryByText, tree;
    let initialState = {
        habits: {
            habits: {
                1: {
                    id: 1,
                    title: 'My First Habit',
                    count: 1,
                    limit: 2,
                    log: [{ updated: 1612235045000, info: { type: 'created' } }, { updated: 1612235045000, info: { type: 'increment' } }]
                }
            }
        }
    }

    beforeEach(() => {
        store = createTestStore();
        stockedStore = createTestStore(initialState);
    })

    it('renders only create new habit button when no habits passed', () => {
        const component = render(<Provider store={store}><PaperProvider theme={theme}><LogPage /></PaperProvider></Provider>);
        queryByText = component.queryByText;
        tree = component.toJSON();
        expect(tree.children[0].children[0].children.length).toBe(1);
        expect(queryByText('Create new habit')).toBeTruthy();
    });

    it('renders correct number of LogButton components when habits passed', () => {
        const component = render(<Provider store={stockedStore}><PaperProvider theme={theme}><LogPage /></PaperProvider></Provider>);
        queryByText = component.queryByText;
        tree = component.toJSON();
        expect(tree.children[0].children[0].children.length).toBe(2);
        expect(queryByText('Create new habit')).toBeTruthy();
        expect(queryByText('My First Habit')).toBeTruthy();
    });
    it('removes relevant LogButton component when habit deleted', async () => {
        const component = render(<Provider store={stockedStore}><PaperProvider theme={theme}><LogPage /></PaperProvider></Provider>);
        queryByText = component.queryByText;
        tree = component.toJSON();
        expect(tree.children[0].children[0].children.length).toBe(2);
        expect(queryByText('Create new habit')).toBeTruthy();
        expect(queryByText('My First Habit')).toBeTruthy();
        const deleteButton = queryByText('Delete');
        fireEvent.press(deleteButton);
        await waitFor(() => { queryByText('Are you sure?') });
        const confirm = queryByText('Yes');
        fireEvent.press(confirm);
        expect(queryByText('My First Habit')).toBeFalsy();
        expect(store.getState().habits).toEqual({ "habits": {} });
    });
    it('redirects to NewHabit page when Create New Habit button clicked', async () => {
        const nav = jest.fn();
        const component = render(<Provider store={store}><PaperProvider theme={theme}><LogPage navigation={{ navigate: nav }} /></PaperProvider></Provider>);
        queryByText = component.queryByText;
        const createNewBtn = queryByText('Create new habit');
        fireEvent.press(createNewBtn);
        expect(nav).toHaveBeenCalledWith('New');
    });
});