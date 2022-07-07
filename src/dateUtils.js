// Check if reset due
export const getResetDateTime = (frequency) => {
    if (frequency == 'Daily') {
        var midnight = new Date();
        midnight.setHours(0, 0, 0, -1);
        return midnight;
    } else if (frequency == 'Weekly') {
        var today = new Date();
        const day = today.getDay();
        today.setHours(23, 59, 59, 59);
        const lastSunday = today.setDate(today.getDate() - day);
        return lastSunday;
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// Show last X days - for now X is 7 for spacing reasons.
// In this function need to handle month and week views - TODO
// Daily 25/01, Weekly 07/05 (last day of week - Sunday), Monthly Jan
export const getLastLabels = (limit, frequency) => {
    const labels = [];
    var count = frequency;
    if (frequency == 7) { // Daily habits want 7 days chunks
        var today = new Date();
        today.setDate(today.getDate() - (limit));

        while (count > 0) {
            today.setDate(today.getDate() + 1);
            labels.push(today.toLocaleDateString("en-GB", options).slice(0, 5));
            count--;
        }
        return labels;
    } else if (frequency == 4) { // Weekly habits want to get totals between Sundays
        // Get the first Sunday
        var weekEnd = getFirstSundayHelper(limit);
        weekEnd.setDate(weekEnd.getDate() - 7);
        while (count > 0) {
            weekEnd.setDate(weekEnd.getDate() + 7)
            labels.push(weekEnd.toLocaleDateString("en-GB", options).slice(0, 5));
            count--;
        }
        return labels;
    } else { // Monthly habits want to display totals for year
        return months;
    }
}

const getFirstSundayHelper = (limit) => {
    var firstSunday = new Date();
    firstSunday.setDate(firstSunday.getDate() - (limit * 7));
    var day = firstSunday.getDay();
    var daysUntilfirstSunday = day == 0 ? 0 : (6 - day) + 1;
    firstSunday.setDate(firstSunday.getDate() + daysUntilfirstSunday);
    firstSunday.setDate(firstSunday.getDate() + 7);
    return firstSunday;
}

export const getYearHelper = (limit) => {
    var now = new Date();
    var year = now.getFullYear(); //2022
    return year - (limit / 12 - 1);
}

export const getFirstEntryLimit = (firstEntry, frequency) => {
    var today = new Date().valueOf(); // get today in unix
    var divisor = 24 * 60 * 60 * 1000;
    var dayDiff = Math.ceil((today - firstEntry) / divisor);
    return (dayDiff - (dayDiff % frequency) + frequency);
}

export const getDataForLabels = (logs, limit, frequency) => {
    // Get label array e.g. [19/06, 26/06, 03/07, 10/07]
    let labels = getLastLabels(limit, frequency);

    let data = [];

    labels.forEach((label, index) => {
        let labelLogs = logs.filter(function (log) {
            if (frequency == 7) {
                var format = new Date(log.updated).toLocaleDateString("en-GB", options).slice(0, 5);
                return format == label;
            } else if (frequency == 4) {
                // get next Sunday
                var thisSunday = getFirstSundayHelper(limit); // sunday 12th june
                thisSunday.setDate(thisSunday.getDate() + (7 * index));
                var end = thisSunday.setHours(23, 59, 59, 59); // label Sunday 23:59:59
                var beginning = thisSunday.setDate(thisSunday.getDate() - 7); // prev sunday 23:59:59
                return (beginning < log.updated && log.updated <= end);
            } else {
                // get year
                var yearDisplayed = getYearHelper(limit); //2022
                var loggedThisYear = new Date(log.updated).getFullYear() == yearDisplayed;
                var loggedThisMonth = months[new Date(log.updated).getMonth()] == label;
                return (loggedThisYear && loggedThisMonth);
            }
        });
        data.push(labelLogs.length);
    });
    return data;
}