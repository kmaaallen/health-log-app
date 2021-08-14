import countReducer from '../src/redux/reducers';

describe('test countReducer', () => {
    it('should return empty habits array as initial state', () => {
        expect(countReducer(undefined, {})).toEqual({ habits: [] });
    });
    it('should handle INCREMENT_COUNT', () => {
        expect(
            countReducer({
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
            }, {
                type: 'INCREMENT_COUNT',
                payload: { updated: new Date('02 Feb 2021 03:04:05 GMT').valueOf(), id: 1 }
            })
        ).toEqual({
            habits: {
                1: {
                    id: 1,
                    count: 1,
                    limit: 1,
                    log: [{ updated: 1612235045000, info: { type: 'increment' } }]
                },
                2: {
                    id: 2,
                    count: 0,
                    limit: 1,
                    log: []
                }
            }
        });
    });
    it('should handle SET_LIMIT', () => {
        expect(
            countReducer({
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
            }, {
                type: 'SET_LIMIT',
                payload: { updated: new Date('02 Feb 2021 03:04:05 GMT').valueOf(), limit: 3, id: 1 }
            })
        ).toEqual({
            habits: {
                1: {
                    id: 1,
                    count: 0,
                    limit: 3,
                    log: [{ updated: 1612235045000, info: { type: 'limit' } }]
                },
                2: {
                    id: 2,
                    count: 0,
                    limit: 1,
                    log: []
                }
            }
        });
    });
    it('should handle RESET_COUNT', () => {
        expect(
            countReducer({
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
            }, {
                type: 'RESET_COUNT',
                payload: { updated: new Date('02 Feb 2021 03:04:05 GMT').valueOf(), id: 1 }
            })
        ).toEqual({
            habits: {
                1: {
                    id: 1,
                    count: 0,
                    limit: 1,
                    log: [{ updated: 1612235045000, info: { type: 'reset' } }]
                },
                2: {
                    id: 2,
                    count: 0,
                    limit: 1,
                    log: []
                }
            }
        });
    })
});