import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers/GameSlice';
import usersReducer from './reducers/UsersSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { gifApi } from '../services/gifService';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['gifApi'],
};

const rootReducer = combineReducers({
  gameReducer,
  usersReducer,
  [gifApi.reducerPath]: gifApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(gifApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
