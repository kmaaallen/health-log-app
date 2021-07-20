import { hasReachedDailyLimitSelector } from '../src/redux/selectors';

describe('test selector', () => {
    it('should return false initially', () => {
        expect(hasReachedDailyLimitSelector({ count: { count: 0, updated: null } })).toBe(false);
    });
    it('should return true if daily limit reached', () => {
        expect(hasReachedDailyLimitSelector({ count: { count: 1, updated: (new Date()).valueOf() } })).toBe(true);
    });
    it('should return false if daily limit not reached', () => {
        var yesterday = new Date('July 17, 2021 23:15:30');
        expect(hasReachedDailyLimitSelector({ count: { count: 1, updated: yesterday.valueOf() } })).toBe(false);
    });
})