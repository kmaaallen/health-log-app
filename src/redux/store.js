import { createStore, combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist';

import countReducer from './reducers';

const rootReducer = combineReducers({ count: countReducer });

//Redux Persist Config
const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    whitelist: [
        'countReducer',
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

let persistor = persistStore(store);

export {
    store,
    persistor,
};
