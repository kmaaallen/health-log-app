import { incrementCount, updateHabit, resetCount, createHabit, deleteHabit } from '../src/redux/actions';
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
        store.dispatch(incrementCount({ updated: new Date('02 Feb 2021 03:04:05 GMT').valueOf() }));
        expect(store.getActions()).toEqual(expectedActions);
    });

});


describe('test updateHabit action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('dispatches correct action and payload', () => {
        const expectedActions = [
            {
                'type': 'UPDATE_HABIT',
                'payload': { updated: 1612235045000, limit: 3, id: 1, category: 'Health', title: 'New Test Habit' }
            },
        ];
        store.dispatch(updateHabit({ updated: new Date('02 Feb 2021 03:04:05 GMT').valueOf(), limit: 3, habitId: 1, category: 'Health', title: 'New Test Habit' }));
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
        store.dispatch(resetCount({ updated: new Date('02 Feb 2021 03:04:05 GMT').valueOf(), habitId: 1 }));
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
                'payload': { updated: 1612235045000, title: 'Test Habit', limit: 3, category: 'Health' }
            },
        ];
        store.dispatch(createHabit({ updated: new Date('02 Feb 2021 03:04:05 GMT').valueOf(), title: 'Test Habit', limit: 3, category: 'Health' }));
        expect(store.getActions()).toEqual(expectedActions);
    });

});

describe('test deleteHabit action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('dispatches correct action and payload', () => {
        const expectedActions = [
            {
                'type': 'DELETE_HABIT',
                'payload': { id: 1 }
            },
        ];
        store.dispatch(deleteHabit({ habitId: 1 }));
        expect(store.getActions()).toEqual(expectedActions);
    });

});
