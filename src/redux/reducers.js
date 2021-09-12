// Initial State

const initialState = {
    habits: {}
};
/* habit structure
const initialState = {
    habits : {1: { id: 1, title: 'My habit', count: 0,limit: 1, log: [{updated: 1234567, info: { type: 'reset'}}]}}
};*/

const habitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_HABIT': {
            const id = state.habits ? Object.keys(state.habits).length + 1 : 1;
            const title = action.payload.title;
            const limit = action.payload.limit;

            return {
                ...state,
                habits: {
                    ...state.habits,
                    [id]: { id: id, title: title, count: 0, limit: limit, log: [{ updated: action.payload.updated, info: { type: 'created' } }] }
                }
            }
        }
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

export default habitReducer;
