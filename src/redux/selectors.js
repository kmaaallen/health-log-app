export const hasReachedFrequencyLimitSelector = (state, id) => {
    return state.habits[id].count >= state.habits[id].limit;
}
