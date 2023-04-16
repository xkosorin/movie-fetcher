import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../../types/Movies";
import { MoviesState, RootState } from "../../types/States";

const initialState: MoviesState = {
  loading: false,
  movies: [],
  error: undefined,
  searchTerm: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesFetch: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.searchTerm = action.payload;
    },
    getMoviesSuccess: (state, action: PayloadAction<IMovie[]>) => {
      state.loading = false;
      state.movies = action.payload;
      state.error = undefined;
    },
    getMoviesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.movies = [];
      state.error = action.payload;
    },
    getSingleMovieFetch: (state) => {
      state.loading = true;
    },
    getSingleMovieSuccess: (state, action: PayloadAction<IMovie>) => {
      state.loading = false;
      (state.movies = [action.payload]), (state.error = undefined);
    },
    getSingleMovieFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.movies = [];
      state.error = action.payload;
    },
  },
});

export const {
  getMoviesFetch,
  getMoviesSuccess,
  getMoviesFailure,
  getSingleMovieFetch,
  getSingleMovieSuccess,
  getSingleMovieFailure,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const getMovies = (state: RootState) => state.movies.movies;
export const getMovieById = (state: RootState, movieId: string) =>
  state.movies.movies.find((movie) => movie.imdbID === movieId);
