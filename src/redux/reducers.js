// Initial State

const initialState = {
    habits: []
};
/* habit structure
const initialState = {
    habits : [ 
        {
            id: 1
            count: 0,
            limit: 1,
            log: [{
                updated: 1234567,
                info: {
                    type: 'reset'
                }
            }]
        }
    ]
};*/

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT': {
            const index = state.habits.findIndex(habit => habit.id == action.payload.id);
            const newArray = [...state.habits];
            newArray[index].count += 1;
            newArray[index].log.push({ updated: action.payload.updated, info: { type: 'increment' } });
            return {
                ...state,
                habits: newArray
            }
        }
        case 'SET_LIMIT': {
            const index = state.habits.findIndex(habit => habit.id == action.payload.id);
            const newArray = [...state.habits];
            newArray[index].limit = action.payload.limit;
            newArray[index].log.push({ updated: action.payload.updated, info: { type: 'limit' } });
            return {
                ...state,
                habits: newArray
            }
        }
        case 'RESET_COUNT': {
            const index = state.habits.findIndex(habit => habit.id == action.payload.id);
            const newArray = [...state.habits];
            newArray[index].count = 0;
            newArray[index].log.push({ updated: action.payload.updated, info: { type: 'reset' } });
            return {
                ...state,
                habits: newArray
            }
        }
        default: {
            return state;
        }
    }
};

export default countReducer;
