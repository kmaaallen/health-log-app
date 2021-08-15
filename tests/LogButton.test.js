import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

import LogButton from '../src/components/LogButton';

describe('<LogButton />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            count: {
                habits: {
                    1: {
                        id: 1,
                        count: 1,
                        limit: 1,
                        log: [{ updated: 1612235045000, info: { type: 'increment' } }]
                    }
                }
            }
        });
    });
    it('has 1 child', () => {
        const tree = renderer.create(<Provider store={store}><LogButton id={1} key={1} /></Provider>).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Provider store={store}><LogButton id={1} key={1} /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
