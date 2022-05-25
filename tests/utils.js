// Set up test store
import { configureStore } from '@reduxjs/toolkit';
import habitReducer from '../src/redux/reducers';

export const createTestStore = (initialState) => {
    const reducer = {
        habits: habitReducer
    }
    const preloadedState = initialState;
    const store = configureStore({
        reducer,
        preloadedState
    });
    return store;
}