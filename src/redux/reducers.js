// Initial State
const initialState = {
    count: 0,
    updated: null,
    limit: 1
};

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT': {
            return {
                ...state,
                count: state.count + 1,
                updated: action.payload.updated
            }
        }
        case 'SET_LIMIT': {
            return {
                ...state,
                limit: action.payload.limit
            }
        }
        case 'RESET_COUNT': {
            return {
                ...state,
                count: 0
            }
        }
        default: {
            return state;
        }
    }
};

export default countReducer;
