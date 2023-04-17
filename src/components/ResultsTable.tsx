import TableRow from "./TableRow";
import { IMovie } from "../types/Movies";

import styles from "../styles/Table.module.scss";

interface Props {
  movies: IMovie[];
}

const ResultsTable = (props: Props) => (
  <table className={styles.table}>
    <tbody>
      {props.movies.map((movie: IMovie) => (
        <TableRow movie={movie} key={movie.imdbID} />
      ))}
    </tbody>
  </table>
);

export default ResultsTable;
