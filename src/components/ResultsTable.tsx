import { useSelector } from "react-redux";
import TableRow from "./TableRow";
import { IMovie } from "../types/Movies";
import { getMovies } from "../store/movies/moviesSlice";

import styles from "../styles/Table.module.scss";

const ResultsTable = () => {
  const movies: IMovie[] = useSelector(getMovies);

  return (
    <table className={styles.table}>
      <tbody>
        {movies.map((movie: IMovie) => (
          <TableRow
            movieId={movie.imdbID}
            title={movie.Title}
            img={movie.Poster}
            year={movie.Year}
            genre={movie.Genre}
            rating={movie.imdbRating}
            favorite={true}
            key={movie.imdbID}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
