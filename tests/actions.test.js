import { incrementCount, setLimit, resetCount } from '../src/redux/actions';
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
                'payload': { updated: 1612235045000 }
            },
        ];
        store.dispatch(incrementCount(new Date('02 Feb 2021 03:04:05 GMT').valueOf()));
        expect(store.getActions()).toEqual(expectedActions);
    });

});

describe('test setLimit action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('dispatches correct action and payload', () => {
        const expectedActions = [
            {
                'type': 'SET_LIMIT',
                'payload': { limit: 3 }
            },
        ];
        store.dispatch(setLimit(3));
        expect(store.getActions()).toEqual(expectedActions);
    });

});

describe('test resetCount action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('dispatches correct action and payload', () => {
        const expectedActions = [
            {
                'type': 'RESET_COUNT'
            },
        ];
        store.dispatch(resetCount());
        expect(store.getActions()).toEqual(expectedActions);
    });

});
