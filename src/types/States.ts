import { IMovie, IMovieDetail } from "./Movies";

export interface MoviesState {
  loading: boolean;
  movies: IMovie[];
  movieDetails: IMovieDetail | null;
  error: string | null;
  searchTerm: string;
  favorites: IMovie[];
  currentPage: number;
  totalPages: number;
}

export interface RootState {
  movies: MoviesState;
}
