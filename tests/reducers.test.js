import countReducer from '../src/redux/reducers';

//Helper
function setUpdated() {
    var now = Date.now();
    var date = new Date(now);
    var dateTime = date.toLocaleString();
    return dateTime;
}

describe('test countReducer', () => {
    it('should return 0 and never as initial state', () => {
        expect(countReducer(undefined, {})).toEqual({ count: 0, updated: 'Never' });
    });
    it('should handle INCREMENT_COUNT', () => {
        expect(
            countReducer({ count: 0, updated: 'Never' }, {
                type: 'INCREMENT_COUNT',
            })
        ).toEqual({ count: 1, updated: setUpdated() });
    });
    it('should handle INCREMENT_COUNT', () => {
        expect(
            countReducer({ count: 5, updated: 'Never' }, {
                type: 'INCREMENT_COUNT',
            })
        ).toEqual({ count: 6, updated: setUpdated() });
    });
});