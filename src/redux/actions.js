export const incrementCount = () => ({
    type: 'INCREMENT_COUNT',
    payload: { updated: (new Date()).valueOf() }
});

