export const incrementCount = (args) => ({
    type: 'INCREMENT_COUNT',
    payload: { updated: args.updated, id: args.habitId }
});

export const resetCount = (args) => ({
    type: 'RESET_COUNT',
    payload: { updated: args.updated, id: args.habitId }
});

export const createHabit = (args) => ({
    type: 'CREATE_HABIT',
    payload: { updated: args.updated, title: args.title, limit: args.limit, category: args.category }
});

export const deleteHabit = (args) => ({
    type: 'DELETE_HABIT',
    payload: { id: args.habitId }
});

export const updateHabit = (args) => ({
    type: 'UPDATE_HABIT',
    payload: { id: args.habitId, updated: args.updated, title: args.title, limit: args.limit, category: args.category }
})
