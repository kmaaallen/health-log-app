export const incrementCount = (date) => ({
    type: 'INCREMENT_COUNT',
    payload: { updated: date }
});

export const setLimit = (limit) => ({
    type: 'SET_LIMIT',
    payload: { limit: limit }
});

export const resetCount = () => ({
    type: 'RESET_COUNT'
});

