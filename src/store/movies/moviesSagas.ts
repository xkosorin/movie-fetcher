import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  addToFavorites,
  getFavoriteMovies,
  getMoviesFailure,
  getMoviesFetch,
  getMoviesSuccess,
  getSingleMovieFailure,
  getSingleMovieFetch,
  getSingleMovieSuccess,
  removeFromFavorites,
} from "./moviesSlice";
import { IMovie, IMovieDetail } from "../../types/Movies";

interface FetchMoviesResponse {
  Response: string;
  Search: IMovie[];
  totalResults: string;
}

function* fetchMoviesSaga(
  action: PayloadAction<{ searchTerm: string; page: number }>
): Generator {
  try {
    const response: AxiosResponse<FetchMoviesResponse> = (yield call(
      axios.get,
      `${import.meta.env.VITE_API_URL}?apikey=${
        import.meta.env.VITE_API_KEY
      }&s=${action.payload.searchTerm}&page=${action.payload.page}`
    )) as AxiosResponse<FetchMoviesResponse>;
    console.log(response.data.Search);
    const movies: IMovie[] = response.data.Search;
    const totalPages: number = Math.ceil(
      parseInt(response.data.totalResults) / 10
    );
    yield put(getMoviesSuccess({ movies, totalPages }));
  } catch (error) {
    yield put(getMoviesFailure((error as Error).message));
  }
}

function* fetchMovieByIdSaga(action: PayloadAction<string>): Generator {
  try {
    const response: AxiosResponse<IMovieDetail> = (yield call(
      axios.get,
      `${import.meta.env.VITE_API_URL}?apikey=${
        import.meta.env.VITE_API_KEY
      }&i=${action.payload}`
    )) as AxiosResponse<IMovieDetail>;
    console.log(response.data);
    const movie: IMovieDetail = response.data;
    yield put(getSingleMovieSuccess(movie));
  } catch (error) {
    yield put(getSingleMovieFailure((error as Error).message));
  }
}

function* updateFavoritesInLocalStorage(): Generator {
  const favorites: IMovie[] = (yield select(getFavoriteMovies)) as IMovie[];
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function* moviesSaga() {
  yield takeLatest(getMoviesFetch.type, fetchMoviesSaga);
  yield takeLatest(getSingleMovieFetch.type, fetchMovieByIdSaga);
  yield takeLatest(addToFavorites.type, updateFavoritesInLocalStorage);
  yield takeLatest(removeFromFavorites.type, updateFavoritesInLocalStorage);
}

export default moviesSaga;
