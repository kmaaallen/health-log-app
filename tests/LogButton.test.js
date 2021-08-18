import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

import LogButton from '../src/components/LogButton';

describe('<LogButton />', () => {
    let store;
    var toLocaleString = Date.prototype.toLocaleString;

    beforeEach(() => {
        store = mockStore({
            count: {
                habits: {
                    1: {
                        id: 1,
                        title: 'My First Habit',
                        count: 1,
                        limit: 1,
                        log: [{ updated: 1612235045000, info: { type: 'created' } }, { updated: 1612235045000, info: { type: 'increment' } }]
                    }
                }
            }
        });
        Date.prototype.toLocaleString = function () {
            return '02/02/2021, 03:04:05';
        }
    });
    afterAll(() => {
        Date.prototype.toLocaleString = toLocaleString;
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
