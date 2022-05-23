import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../App';
import CreateHabit from '../src/components/CreateHabit';
// Testing
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { createTestStore } from './utils';

describe('<CreateHabit />', () => {
    let store;

    beforeEach(() => {
        store = createTestStore();
    });

    it('has 1 child', () => {
        const tree = renderer.create(<Provider store={store} ><CreateHabit theme={theme} /></Provider>).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={store} ><CreateHabit theme={theme} /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders create new habit button, that when clicked shows dialog content and allows new habit to be created', async () => {
        // Paper provider component wrapper required for react-native-paper, provided at app level
        const { getByText, getByTestId, queryByText } = render(<Provider store={store}><PaperProvider theme={theme}><CreateHabit /></PaperProvider></Provider>);
        const button = getByText('Create new habit');
        // Check button is there
        expect(button).toBeTruthy();
        // Expect store to be empty at this stage
        expect(store.getState().habits).toEqual({ "habits": {} });
        // Click button
        fireEvent.press(button);
        await waitFor(() => queryByText('Create a habit'));
        // Dialog with form present
        const title = getByTestId('title-input');
        const limit = getByTestId('limit-input');
        const newCategory = getByTestId('new-category');
        const submit = getByText('Ok');
        expect(title && limit && newCategory).toBeTruthy();
        // change form values and submit form with new category
        fireEvent.changeText(title, 'My first habit');
        fireEvent.changeText(limit, '3');
        fireEvent.changeText(newCategory, 'Health');
        await waitFor(() => {
            fireEvent.press(submit);
        });
        // Expect store to be updated with one habit
        expect(Object.keys(store.getState().habits.habits).length).toBe(1);
        expect(store.getState().habits.habits[1].title).toBe('My first habit');
        expect(store.getState().habits.habits[1].limit).toBe('3');
        expect(store.getState().habits.habits[1].category).toBe('Health');
        // Expect existing category to now be present on form dialogue
        fireEvent.press(button);
        await waitFor(() => queryByText('Create a habit'));
        // expect existing category to be there now
        const existingCategory = getByTestId('category-input');
        expect(existingCategory).toBeTruthy();
    }),
        it('validates errors correctly in create new habit form', async () => {
            // Paper provider component wrapper required for react-native-paper, provided at app level
            const { getByText, getByTestId, queryByText } = render(<Provider store={store}><PaperProvider theme={theme}><CreateHabit /></PaperProvider></Provider>);
            const button = getByText('Create new habit');
            // Expect store to be empty at this stage
            expect(store.getState().habits).toEqual({ "habits": {} });
            // Click button
            fireEvent.press(button);
            await waitFor(() => queryByText('Create a habit'));
            const limit = getByTestId('limit-input');
            const submit = getByText('Ok');
            await waitFor(() => {
                fireEvent.press(submit);
            });
            // Expect store to not be updated and error messages present
            expect(Object.keys(store.getState().habits.habits).length).toBe(0);
            expect(getByText('Title is required')).toBeTruthy();
            expect(getByText('Limit is required')).toBeTruthy();
            // change limit valueto check other error message and submit form
            fireEvent.changeText(limit, '0');
            await waitFor(() => {
                fireEvent.press(submit);
            });
            expect(Object.keys(store.getState().habits.habits).length).toBe(0);
            expect(getByText('Title is required')).toBeTruthy();
            expect(getByText('Limit must be greater than zero')).toBeTruthy();
        })
});
