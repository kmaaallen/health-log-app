import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

import App from '../App';

jest.mock('redux-persist/integration/react', () => ({
    PersistGate: props => props.children,
}));

describe('<App />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({ count: { habits: {} } });
    });
    it('has 1 child', () => {
        const tree = renderer.create(<Provider store={store}><App /></Provider>).toJSON();
        expect(tree.children.length).toBe(1);
    });
    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={store}><App /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});