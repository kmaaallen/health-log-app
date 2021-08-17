export const incrementCount = (date, id) => ({
    type: 'INCREMENT_COUNT',
    payload: { updated: date, id: id }
});

export const setLimit = (date, limit, id) => ({
    type: 'SET_LIMIT',
    payload: { updated: date, limit: limit, id: id }
});

export const resetCount = (date, id) => ({
    type: 'RESET_COUNT',
    payload: { updated: date, id: id }
});

export const createHabit = (date, title, limit) => ({
    type: 'CREATE_HABIT',
    payload: { updated: date, title: title, limit: limit }
});

