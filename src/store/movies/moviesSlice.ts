import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMovie, IMovieDetail } from "../../types/Movies";
import { MoviesState, RootState } from "../../types/States";

const loadFavoritesFromLocalStorage = (): IMovie[] => {
  try {
    const serializedState = localStorage.getItem("favorites");

    if (serializedState === null) {
      return [];
    }

    const parsedMovies = JSON.parse(serializedState);

    const test = parsedMovies.map(
      (movie: any): IMovie => ({
        Poster: movie.Poster,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        imdbID: movie.imdbID,
      })
    );

    console.log("tu som");
    console.log(test);
    return test;
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return [];
  }
};

const initialState: MoviesState = {
  loading: false,
  movies: [],
  movieDetails: null,
  error: null,
  searchTerm: "",
  favorites: loadFavoritesFromLocalStorage(),
  currentPage: 1,
  totalPages: 1,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesFetch: (
      state,
      action: PayloadAction<{ searchTerm: string; page: number }>
    ) => {
      state.loading = true;
      state.searchTerm = action.payload.searchTerm;
      state.currentPage = action.payload.page;
    },
    getMoviesSuccess: (
      state,
      action: PayloadAction<{ movies: IMovie[]; totalPages: number }>
    ) => {
      state.loading = false;
      state.movies = action.payload.movies;
      state.error = null;
      state.totalPages = action.payload.totalPages;
    },
    getMoviesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.movies = [];
      state.error = action.payload;
    },
    getSingleMovieFetch: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.searchTerm = action.payload;
    },
    getSingleMovieSuccess: (state, action: PayloadAction<IMovieDetail>) => {
      state.loading = false;
      state.movieDetails = action.payload;
      state.error = null;
    },
    getSingleMovieFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.movies = [];
      state.error = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<IMovie>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<IMovie>) => {
      console.log(action.payload.imdbID);
      state.favorites = state.favorites.filter(
        (movie) => movie.imdbID !== action.payload.imdbID
      );
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
  addToFavorites,
  removeFromFavorites,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const getMovies = (state: RootState): IMovie[] => state.movies.movies;
export const getError = (state: RootState): string | null => state.movies.error;
export const getLoading = (state: RootState): boolean => state.movies.loading;
export const getMovieDetails = (state: RootState): IMovieDetail | null =>
  state.movies.movieDetails;
export const getFavoriteMovies = (state: RootState): IMovie[] =>
  state.movies.favorites;
