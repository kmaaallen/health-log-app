// Initial State
const initialState = {
    count: 0,
    updated: 'Never'
};

//Helpers
function setUpdated() {
    var now = Date.now();
    var date = new Date(now);
    var dateTime = date.toLocaleString();
    return dateTime;
}

const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT': {
            return {
                ...state,
                count: state.count + 1,
                updated: setUpdated()
            }
        }
        default: {
            return state;
        }
    }
};

export default countReducer;
