// Initial State
const initialState = {
    count: 0,
    updated: null
};

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT': {
            return {
                ...state,
                count: state.count + 1,
                updated: (new Date()).valueOf()
            }
        }
        default: {
            return state;
        }
    }
};

export default countReducer;
