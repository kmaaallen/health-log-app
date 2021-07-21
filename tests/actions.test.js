import { incrementCount } from '../src/redux/actions';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore();

describe('test incrementCount action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('dispatches correct action and payload', () => {
        const expectedActions = [
            {
                'type': 'INCREMENT_COUNT',
                'payload': { updated: (new Date()).valueOf() }
            },
        ];
        store.dispatch(incrementCount({ updated: (new Date()).valueOf() }));
        expect(store.getActions()).toEqual(expectedActions);
    });

});
