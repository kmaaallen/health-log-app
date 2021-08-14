import { hasReachedDailyLimitSelector } from '../src/redux/selectors';

describe('test selector', () => {
    it('should return false initially', () => {
        expect(hasReachedDailyLimitSelector({ count: { count: 0, limit: 1 } })).toBe(false);
    });
    it('should return true if daily limit reached', () => {
        expect(hasReachedDailyLimitSelector({ count: { count: 1, limit: 1 } })).toBe(true);
    });
    it('should return false if daily limit not reached', () => {
        expect(hasReachedDailyLimitSelector({ count: { count: 1, limit: 3 } })).toBe(false);
    });
})