import SearchInput from "./SearchInput";
import ResultsTable from "./ResultsTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { getMoviesFetch } from "../store/movies/moviesSlice";

import styles from "../styles/Homepage.module.scss";

const Homepage = () => {
  const movies = useSelector((state) => state);
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getMoviesFetch());
  }, [dispatch]);

  useEffect(() => {
    console.log(inputRef);
  }, [inputRef.current]);

  return (
    <div className={styles.container}>
      <h1>Find your movie</h1>
      <SearchInput ref={inputRef} />
      <ResultsTable />
    </div>
  );
};

export default Homepage;
