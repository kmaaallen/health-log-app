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
            const logObj = { updated: action.payload.updated, info: { type: 'increment' } };
            return {
                ...state,
                habits: {
                    ...state.habits,
                    [id]: {
                        ...state.habits[id],
                        count: state.habits[id].count + 1,
                        log: [
                            ...state.habits[id].log,
                            logObj
                        ]
                    }
                }
            }
        }
        case 'SET_LIMIT': {
            const id = action.payload.id;
            const logObj = { updated: action.payload.updated, info: { type: 'limit' } };
            return {
                ...state,
                habits: {
                    ...state.habits,
                    [id]: {
                        ...state.habits[id],
                        limit: action.payload.limit,
                        log: [
                            ...state.habits[id].log,
                            logObj
                        ]
                    }
                }
            }
        }
        case 'RESET_COUNT': {
            const id = action.payload.id;
            const logObj = { updated: action.payload.updated, info: { type: 'reset' } };
            return {
                ...state,
                habits: {
                    ...state.habits,
                    [id]: {
                        ...state.habits[id],
                        count: 0,
                        log: [
                            ...state.habits[id].log,
                            logObj
                        ]
                    }
                }
            }
        }
        default: {
            return state;
        }
    }
};

export default habitReducer;
