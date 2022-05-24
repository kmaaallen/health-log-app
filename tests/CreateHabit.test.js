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
import { getByTestId } from '@testing-library/dom';

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

    it('renders create new habit button, that when clicked shows create habit dialog', async () => {
        // Paper provider component wrapper required for react-native-paper, provided at app level
        const { getByText, getByTestId, queryByText } = render(<Provider store={store}><PaperProvider theme={theme}><CreateHabit /></PaperProvider></Provider>);
        const button = getByText('Create new habit');
        // Check button is there
        expect(button).toBeTruthy();
        // Click button
        fireEvent.press(button);
        await waitFor(() => queryByText('Create a habit'));
        // Dialog with form present
        // Expect category field to be there on load
        const title = getByTestId('title-input');
        const limit = getByTestId('limit-input');
        const category = getByTestId('category-input');
        const submit = getByText('Ok');
        expect(title && limit && category && submit).toBeTruthy();
    }),
        it('allows users to select an existing category or create a new one for a new habit in the new habit dialog', async () => {
            // Paper provider component wrapper required for react-native-paper, provided at app level
            const { getByText, getByTestId, queryByText, queryByTestId } = render(<Provider store={store}><PaperProvider theme={theme}><CreateHabit /></PaperProvider></Provider>);
            const button = getByText('Create new habit');
            fireEvent.press(button);
            await waitFor(() => queryByText('Create a habit'));
            // Dialog with form present
            const defaultCat = getByTestId('category-input');
            // Expect default category to be "Please select a category" - using selected Index to check label
            expect(defaultCat.props.items[defaultCat.props.selectedIndex].label).toBe('Please select a category');
            // && expect new category text input to be hidden
            expect(queryByTestId('new-category')).toBeFalsy();
            // Change picker to 'New category'
            fireEvent(defaultCat, 'onValueChange', 'New category');
            // Expect category picker to be "New category" && expecting new category text input to be visible
            expect(defaultCat.props.items[defaultCat.props.selectedIndex].label).toBe('New category');
            await waitFor(() => queryByTestId('new-category'));
            expect(getByTestId('new-category')).toBeTruthy();
        }),
        it('allows users to submit a new habit under a new category or an existing category', async () => {
            const { getByText, getByTestId, queryByText, queryByTestId } = render(<Provider store={store}><PaperProvider theme={theme}><CreateHabit /></PaperProvider></Provider>);
            // Expect store to be empty at this stage
            expect(store.getState().habits).toEqual({ "habits": {} });
            // Open dialog
            const button = getByText('Create new habit');
            fireEvent.press(button);
            await waitFor(() => queryByText('Create a habit'));
            const title = getByTestId('title-input');
            const limit = getByTestId('limit-input');
            const submit = getByText('Ok');
            // Expect only default items (please select and new) to be available in category picker
            expect(getByTestId('category-input').props.items.length).toBe(2);
            // Change form values and submit form with existing category
            fireEvent.changeText(title, 'My first habit');
            fireEvent.changeText(limit, '3');
            fireEvent(getByTestId('category-input'), 'onValueChange', 'New category');
            await waitFor(() => queryByTestId('new-category'));
            fireEvent.changeText(getByTestId('new-category'), 'Health');
            await waitFor(() => {
                fireEvent.press(submit);
            });
            // Expect store to be updated with one habit that has new category health
            expect(Object.keys(store.getState().habits.habits).length).toBe(1);
            expect(store.getState().habits.habits[1].title).toBe('My first habit');
            expect(store.getState().habits.habits[1].limit).toBe('3');
            expect(store.getState().habits.habits[1].category).toBe('Health');
            // Expect existing category to now be present on form dialogue for second habit - re-open dialog to create another habit
            fireEvent.press(button);
            await waitFor(() => queryByText('Create a habit'));
            // expect existing category to be there now
            expect(queryByTestId('category-input').props.items.length).toBe(3);
            expect((queryByTestId('category-input').props.items[2].label)).toBe('Health');
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
