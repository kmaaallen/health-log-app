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
// options for local date string
const options = {
    month: "2-digit",
    day: "2-digit"
};

// Show last X days - for now X is 7 for spacing reasons.
// In this function need to handle month and week views - TODO
// Daily 25/01, Weekly 07/05 (last day of week - Sunday), Monthly Jan
export const getLastLabels = (limit, frequency) => {
    const labels = [];
    var count = frequency;

    var today = new Date();
    today.setDate(today.getDate() - (limit));

    while (count > 0) {
        today.setDate(today.getDate() + 1);
        labels.push(today.toLocaleDateString("en-GB", options).slice(0, 5));
        count--;
    }
    return labels;
}

export const getFirstEntryLimit = (firstEntry, frequency) => {
    var today = new Date().valueOf(); // get today in unix
    var divisor = 24 * 60 * 60 * 1000;
    var dayDiff = Math.ceil((today - firstEntry) / divisor);
    return (dayDiff - (dayDiff % frequency) + frequency);
}

export const getDataForLabels = (logs, limit, frequency) => {
    // Get label array
    let labels = getLastLabels(limit, frequency);

    let data = [];

    labels.forEach((label) => {
        let labelLogs = logs.filter(function (log) {
            var format = new Date(log.updated).toLocaleDateString("en-GB", options).slice(0, 5);
            return format == label;
        });
        data.push(labelLogs.length);
    });
    return data;
}