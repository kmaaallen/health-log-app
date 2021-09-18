export const hasReachedDailyLimitSelector = (state, id) => {
    return state.habits[id].count >= state.habits[id].limit;
}
