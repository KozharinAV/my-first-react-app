import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/GameSlice";
import usersReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
  gameReducer,
  usersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
