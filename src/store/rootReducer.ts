import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./movies/moviesSlice";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
