import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getMoviesFailure,
  getMoviesFetch,
  getMoviesSuccess,
} from "./moviesSlice";
import { IMovie } from "../../types/Movies";

interface ApiResponse {
  data: IMovie[];
}

function* fetchMoviesSaga(action: PayloadAction<string>): Generator {
  try {
    /* const response: AxiosResponse<ApiResponse> = (yield call(
      axios.get,
      `${import.meta.env.VITE_API_URL}?apikey=${
        import.meta.env.VITE_API_KEY
      }&s=Taxi`
    )) as AxiosResponse<ApiResponse>; */
    const response: AxiosResponse = (yield call(
      axios.get,
      `http://localhost:5173/test.json`
    )) as AxiosResponse<ApiResponse>;
    const movies: IMovie[] = response.data;
    yield put(getMoviesSuccess(movies));
  } catch (error) {
    yield put(getMoviesFailure((error as Error).message));
  }
}

function* moviesSaga() {
  yield takeLatest(getMoviesFetch.type, fetchMoviesSaga);
}

export default moviesSaga;
