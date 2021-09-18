import { hasReachedDailyLimitSelector } from '../src/redux/selectors';

describe('test selector', () => {
    it('should return false initially for untracked habit', () => {
        expect(hasReachedDailyLimitSelector({
            habits: {
                1: {
                    id: 1,
                    count: 0,
                    limit: 1,
                    log: []
                },
                2: {
                    id: 2,
                    count: 0,
                    limit: 1,
                    log: []
                }
            }
        }, 1)).toBe(false);
    });
    it('should return true if daily limit reached', () => {
        expect(hasReachedDailyLimitSelector({
            habits: {
                1: {
                    id: 1,
                    count: 1,
                    limit: 1,
                    log: []
                },
                2: {
                    id: 2,
                    count: 0,
                    limit: 1,
                    log: []
                }
            }
        }, 1)).toBe(true);
    });
    it('should return false if daily limit not reached', () => {
        expect(hasReachedDailyLimitSelector({
            habits: {
                1: {
                    id: 1,
                    count: 2,
                    limit: 3,
                    log: []
                },
                2: {
                    id: 2,
                    count: 0,
                    limit: 1,
                    log: []
                }
            }
        }, 1)).toBe(false);
    });
})