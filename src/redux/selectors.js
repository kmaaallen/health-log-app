export const hasReachedDailyLimitSelector = (state) => {
    var newDate = new Date();
    var updatedDate = new Date(state.count.updated)

    return state.count.updated != null &&
        updatedDate.getDate() == newDate.getDate() &&
        updatedDate.getMonth() == newDate.getMonth() &&
        updatedDate.getYear() == newDate.getYear()
}
