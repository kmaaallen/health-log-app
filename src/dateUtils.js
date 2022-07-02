import moment from 'moment';
moment().format();

// Daily Habits
// Show last X days - for now X is 7 for spacing reasons.
export const getLastLabels = (limit) => {
    const labels = [];
    const today = moment().format('D');

    while (limit >= 0) {
        labels.push(moment().subtract(limit, 'days').format('DD/MM'));
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