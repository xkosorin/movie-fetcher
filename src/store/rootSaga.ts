import { all, fork } from "redux-saga/effects";
import movieSaga from "./movies/moviesSagas";

export default function* rootSaga() {
  yield all([fork(movieSaga)]);
}
