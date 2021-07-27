import { incrementCount } from '../src/redux/actions';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore();

describe('test incrementCount action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('dispatches correct action and payload', () => {
        const current = new Date();
        const expectedActions = [
            {
                'type': 'INCREMENT_COUNT',
                'payload': { updated: current.valueOf() }
            },
        ];
        store.dispatch(incrementCount({ updated: current.valueOf() }));
        expect(store.getActions()).toEqual(expectedActions);
    });

});
