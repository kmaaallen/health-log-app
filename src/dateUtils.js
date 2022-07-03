// Check if reset due
export const getResetDateTime = (frequency) => {
    if (frequency == 'Daily') {
        var midnight = new Date();
        midnight.setHours(23, 59, 59, 59);
        return midnight;
    } else if (frequency == 'Weekly') {
        var today = new Date();
        const day = today.getDay();
        today.setHours(23, 59, 59, 59);
        const lasySunday = today.setDate(today.getDate() - day);
        return lasySunday;
    } else { // Monthly
        var today = new Date();
        today.setDate(1); // going to 1st of the month
        const lastDayOfPrevMonth = today.setHours(0, 0, 0, -1); // going to 23:59:59 of previous day
        return lastDayOfPrevMonth;
    }
}

// For Reports
// Show last X days - for now X is 7 for spacing reasons.
export const getLastLabels = (limit) => {
    const labels = [];
    var today = new Date();
    today.setDate(today.getDate() - (limit + 1));

    while (limit >= 0) {
        today.setDate(today.getDate() + 1);
        labels.push(today.toLocaleDateString().slice(0, 5));
        limit--;
    }
    return labels;
}

export const getUnixLimit = (limit) => {
    var today = new Date();
    today.setHours(23, 59, 59, 59);
    return today - (limit + 1) * 24 * 60 * 60 * 1000;
}

export const getDataForLabels = (logs, limit) => {
    // Get label array
    let labels = getLastLabels(limit);

    let data = [];

    labels.forEach((label) => {
        let labelLogs = logs.filter(function (log) {
            var format = new Date(log.updated).toLocaleDateString().slice(0, 5);
            return format == label;
        });
        data.push(labelLogs.length);
    });
    return data;
}