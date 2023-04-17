import { useSelector } from "react-redux";
import { getFavoriteMovies, getLoading } from "../store/movies/moviesSlice";
import ResultsTable from "./ResultsTable";

import styles from "../styles/Favorites.module.scss";

const favorites = () => {
  const loading = useSelector(getLoading);
  const favorites = useSelector(getFavoriteMovies);

  return (
    <div className={styles.container}>
      <h1>Your favorite movies</h1>
      {loading ? <div>Loading...</div> : <ResultsTable movies={favorites} />}
    </div>
  );
};

export default favorites;
