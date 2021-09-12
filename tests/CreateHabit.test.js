import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { theme } from '../App';

const mockStore = configureStore([]);

import CreateHabit from '../src/components/CreateHabit';


describe('<CreateHabit />', () => {

    let store;

    beforeEach(() => {
        store = mockStore({ count: { habits: {} } });
    });


    it('has 1 child', () => {
        const tree = renderer.create(<Provider store={store} ><CreateHabit theme={theme} /></Provider>).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={store} ><CreateHabit theme={theme} /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
