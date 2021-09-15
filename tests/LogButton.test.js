import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../App';
import LogButton from '../src/components/LogButton';
// Testing
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { createTestStore } from './utils';

//TODO - Should not be using test IDs if possible as not real user experience.
// but so far unable to get React Native Paper buttons in any other way

describe('<LogButton />', () => {
    let store;
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
                        log: [{ updated: 1612235045000, info: { type: 'created' } }, { updated: 1612235045000, info: { type: 'increment' } }]
                    }
                }
            }
        };
        store = createTestStore(initialState);
        Date.prototype.toLocaleString = function () {
            return '02/02/2021, 03:04:05';
        }
    });

    afterAll(() => {
        Date.prototype.toLocaleString = toLocaleString;
    });

    it('has 1 child', () => {
        const tree = renderer.create(<Provider store={store}><PaperProvider theme={theme}><LogButton id={1} key={1} /></PaperProvider></Provider>).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={store}><PaperProvider theme={theme}><LogButton id={1} key={1} /></PaperProvider></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('resets habit count to 0 on first rendering ', () => {
        render(<Provider store={store}><PaperProvider theme={theme}><LogButton id={1} key={1} /></PaperProvider></Provider>);
        expect(store.getState().habits.habits[1].count).toBe(0);
    });

    it('displays count / limit and last updated', () => {
        const { getByText } = render(<Provider store={store}><PaperProvider theme={theme}><LogButton id={1} key={1} /></PaperProvider></Provider>);
        const display = getByText('0 / 2');
        const updated = getByText('Last logged: 02/02/2021, 03:04:05');
        expect(display && updated).toBeTruthy();
    });

    it('renders + button which increments count when clicked and is disabled when limit reached', () => {
        const { getByText } = render(<Provider store={store}><PaperProvider theme={theme}><LogButton id={1} key={1} /></PaperProvider></Provider>);
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

    it('renders set limit button which allows user to update limit', async () => {
        const { getByText, getByTestId, queryByText } = render(<Provider store={store}><PaperProvider theme={theme}><LogButton id={1} key={1} /></PaperProvider></Provider>);
        const button = getByText('Set Limit');
        expect(button).toBeTruthy();
        expect(store.getState().habits.habits[1].limit).toBe(2);
        fireEvent.press(button);
        await waitFor(() => queryByText('Choose a daily limit'));
        const input = getByTestId('daily-limit');
        fireEvent.changeText(input, '4');
        fireEvent.press(getByText('Ok'));
        expect(store.getState().habits.habits[1].limit).toBe('4')
    });

});
