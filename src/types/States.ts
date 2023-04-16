import { IMovie } from "./Movies";

export interface MoviesState {
  loading: boolean;
  movies: IMovie[];
  error: string | undefined;
}

export interface RootState {
  movies: MoviesState;
}
