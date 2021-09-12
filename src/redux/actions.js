export const incrementCount = (args) => ({
    type: 'INCREMENT_COUNT',
    payload: { updated: args.updated, id: args.habitId }
});

export const setLimit = (args) => ({
    type: 'SET_LIMIT',
    payload: { updated: args.updated, limit: args.limit, id: args.habitId }
});

export const resetCount = (args) => ({
    type: 'RESET_COUNT',
    payload: { updated: args.updated, id: args.habitId }
});

export const createHabit = (args) => ({
    type: 'CREATE_HABIT',
    payload: { updated: args.updated, title: args.title, limit: args.limit }
});

