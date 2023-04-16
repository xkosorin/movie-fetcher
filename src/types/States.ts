import { IMovie } from "./Movies";

export interface MoviesState {
  loading: boolean;
  movies: IMovie[];
  error: string | undefined;
  searchTerm: string;
}

export interface RootState {
  movies: MoviesState;
}
