// Set up test store
import { createStore, combineReducers } from 'redux';
import habitReducer from '../src/redux/reducers';

export const createTestStore = (initialState) => {
    const store = createStore(
        combineReducers({
            habits: habitReducer,
        }),
        initialState
    );
    return store;
}