export const hasReachedDailyLimitSelector = (state) => {
    return state.count.count >= state.count.limit;
}
