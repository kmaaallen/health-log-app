import {
    getDataForLabels,
    getFirstEntryLimit,
    getYearHelper,
    getFirstSundayHelper,
    getLastLabels,
    getResetDateTime
} from '../src/dateUtils';

describe('dateUtils', () => {

    beforeAll(() => {
        // MOCK TODAY TO BE 1st April 2022 (friday)
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2022-04-01'));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('getResetDateTime should return reset time depending on frequency', () => {
        // Daily frequency
        expect(getResetDateTime('Daily')).toBe(1648771199999);
        // Weekly frequency
        expect(getResetDateTime('Weekly')).toBe(1648425599059);
        // Monthly frequency
        expect(getResetDateTime('Monthly')).toBe(1648771199999);

    });

    test('getFirstEntryLimit should return the earliest screen limit for habit based on frequency', () => {
        // Daily habit - first entry within the week - expect screen limit to go up to 7
        let firstEntry = 1648279453000; // 26/03
        let frequency = 7;
        expect(getFirstEntryLimit(firstEntry, frequency)).toBe(7);
        // Daily habit - first entry three weeks prior - expect screen limit to go up to 28
        firstEntry = 1646983453000; // 11/03
        expect(getFirstEntryLimit(firstEntry, frequency)).toBe(28);
    });

    test('getYearHelper should show year to be displayed based on limit passed', () => {
        let limit = 12;
        expect(getYearHelper(limit)).toEqual(2022);
        limit = 24;
        expect(getYearHelper(limit)).toEqual(2021);
        limit = 108;
        expect(getYearHelper(limit)).toEqual(2014);
    });

    test('getLastLabels should return the correct labels based on limit, frequency', () => {
        // Daily habit, first page of data
        let limit = 7;
        let frequency = 7;
        expect(getLastLabels(limit, frequency)).toStrictEqual(['26/03', '27/03', '28/03', '29/03', '30/03', '31/03', '01/04']);
        // Daily habit, previous page of data
        limit = 14;
        frequency = 7;
        expect(getLastLabels(limit, frequency)).toStrictEqual(['19/03', '20/03', '21/03', '22/03', '23/03', '24/03', '25/03']);
        // Weekly habit, first page of data
        limit = 4;
        frequency = 4;
        expect(getLastLabels(limit, frequency)).toStrictEqual(['13/03', '20/03', '27/03', '03/04']);
        // Weekly habit, previous page of data
        limit = 8;
        frequency = 4;
        expect(getLastLabels(limit, frequency)).toStrictEqual(['13/02', '20/02', '27/02', '06/03']);
        // Monthly habit, first page of data
        limit = 12;
        frequency = 12;
        expect(getLastLabels(limit, frequency)).toStrictEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        // Monthly habit, previous page of data
        limit = 24;
        frequency = 12;
        expect(getLastLabels(limit, frequency)).toStrictEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    });

    test('getDataForLabels should return the correct data for labels based on limit, log, frequency', () => {
        // Daily first page
        let limit = 7;
        let frequency = 7;
        // log composition: 2 x 01/04, 1 x 30/03, 1 x 26/03
        let log = [
            { updated: 1648279453000, info: { type: 'increment' } },
            { updated: 1648621453000, info: { type: 'increment' } },
            { updated: 1648784240000, info: { type: 'increment' } },
            { updated: 1648794253000, info: { type: 'increment' } }
        ];
        expect(getDataForLabels(log, limit, frequency)).toStrictEqual([1, 0, 0, 0, 1, 0, 2]);
        // Weekly first page
        limit = 4;
        frequency = 4;
        // 2 x this week, 1 x previous week, 1 x 2 weeks ago
        log = [
            { updated: 1647588253000, info: { type: 'increment' } },
            { updated: 1648279453000, info: { type: 'increment' } },
            { updated: 1648784240000, info: { type: 'increment' } },
            { updated: 1648794253000, info: { type: 'increment' } }
        ];
        expect(getDataForLabels(log, limit, frequency)).toStrictEqual([0, 1, 1, 2]);
        // Monthly first page
        limit = 12;
        frequency = 12;
        // 2 x Apr, 1 x Feb, 1 x Mar
        log = [
            { updated: 1645169053000, info: { type: 'increment' } },
            { updated: 1647588253000, info: { type: 'increment' } },
            { updated: 1648784240000, info: { type: 'increment' } },
            { updated: 1648794253000, info: { type: 'increment' } }
        ];
        expect(getDataForLabels(log, limit, frequency)).toStrictEqual([0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0]);

    });
})