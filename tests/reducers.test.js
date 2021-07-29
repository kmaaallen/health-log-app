import countReducer from '../src/redux/reducers';

describe('test countReducer', () => {
    it('should return 0 and null as initial state', () => {
        expect(countReducer(undefined, {})).toEqual({ count: 0, updated: null });
    });
    it('should handle INCREMENT_COUNT', () => {
        expect(
            countReducer({ count: 0, updated: null }, {
                type: 'INCREMENT_COUNT',
                payload: { updated: new Date('02 Feb 2021 03:04:05 GMT').valueOf() }
            })
        ).toEqual({ count: 1, updated: 1612235045000 });
    });
});