import { incrementCount, setLimit, resetCount, createHabit } from '../src/redux/actions';
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
                'payload': { updated: 1612235045000, limit: 3, id: 1 }
            },
        ];
        store.dispatch(setLimit(new Date('02 Feb 2021 03:04:05 GMT').valueOf(), 3, 1));
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
                'type': 'RESET_COUNT',
                'payload': { updated: 1612235045000, id: 1 }
            },
        ];
        store.dispatch(resetCount(new Date('02 Feb 2021 03:04:05 GMT').valueOf(), 1));
        expect(store.getActions()).toEqual(expectedActions);
    });

});

describe('test createHabit action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('dispatches correct action and payload', () => {
        const expectedActions = [
            {
                'type': 'CREATE_HABIT',
                'payload': { updated: 1612235045000, title: 'Test Habit', limit: 3 }
            },
        ];
        store.dispatch(createHabit(new Date('02 Feb 2021 03:04:05 GMT').valueOf(), 'Test Habit', 3));
        expect(store.getActions()).toEqual(expectedActions);
    });

});
