import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getMoviesFailure,
  getMoviesFetch,
  getMoviesSuccess,
  getSingleMovieFailure,
  getSingleMovieFetch,
  getSingleMovieSuccess,
} from "./moviesSlice";
import { IMovie } from "../../types/Movies";

interface FetchMoviesResponse {
  Response: string;
  Search: IMovie[];
  totalResults: string;
}

function* fetchMoviesSaga(action: PayloadAction<string>): Generator {
  try {
    const { payload } = action;

    const response: AxiosResponse<FetchMoviesResponse> = (yield call(
      axios.get,
      `${import.meta.env.VITE_API_URL}?apikey=${
        import.meta.env.VITE_API_KEY
      }&s=${action.payload}`
    )) as AxiosResponse<FetchMoviesResponse>;
    console.log(response.data.Search);
    const movies: IMovie[] = response.data.Search;
    yield put(getMoviesSuccess(movies));
  } catch (error) {
    yield put(getMoviesFailure((error as Error).message));
  }
}

function* fetchMovieByIdSaga(action: PayloadAction<string>): Generator {
  try {
    const response: AxiosResponse<IMovie> = (yield call(
      axios.get,
      `${import.meta.env.VITE_API_URL}?apikey=${
        import.meta.env.VITE_API_KEY
      }&s=Taxi`
    )) as AxiosResponse<IMovie>;
    const movie: IMovie = response.data;
    yield put(getSingleMovieSuccess(movie));
  } catch (error) {
    yield put(getSingleMovieFailure((error as Error).message));
  }
}

function* moviesSaga() {
  yield takeLatest(getMoviesFetch.type, fetchMoviesSaga);
  yield takeLatest(getSingleMovieFetch.type, fetchMovieByIdSaga);
}

export default moviesSaga;
