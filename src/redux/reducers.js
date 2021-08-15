// Initial State

const initialState = {
    habits: {}
};
/* habit structure
const initialState = {
    habits : {1: { id: 1, count: 0,limit: 1, log: [{updated: 1234567, info: { type: 'reset'}}]}}
};*/

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT': {
            const id = action.payload.id;
            const habit = state.habits[id];
            habit.count += 1;
            habit.log.push({ updated: action.payload.updated, info: { type: 'increment' } });
            return {
                ...state
            }
        }
        case 'SET_LIMIT': {
            const id = action.payload.id;
            const habit = state.habits[id];
            habit.limit = action.payload.limit;
            habit.log.push({ updated: action.payload.updated, info: { type: 'limit' } });
            return {
                ...state
            }
        }
        case 'RESET_COUNT': {
            const id = action.payload.id;
            const habit = state.habits[id];
            habit.count = 0;
            habit.log.push({ updated: action.payload.updated, info: { type: 'reset' } });
            return {
                ...state
            }
        }
        default: {
            return state;
        }
    }
};

export default countReducer;
