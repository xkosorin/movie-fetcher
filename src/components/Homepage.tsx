import SearchInput from "./SearchInput";
import ResultsTable from "./ResultsTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMoviesFetch } from "../store/movies/moviesSlice";

import styles from "../styles/Homepage.module.scss";

const Homepage = () => {
  const movies = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesFetch());
  }, [dispatch]);

  console.log(movies);

  return (
    <div className={styles.container}>
      <h1>Find your movie</h1>
      <SearchInput />
      <ResultsTable />
    </div>
  );
};

export default Homepage;
