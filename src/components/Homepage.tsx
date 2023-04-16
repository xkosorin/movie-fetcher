import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getMoviesFetch } from "../store/movies/moviesSlice";

import SearchInput from "./SearchInput";
import ResultsTable from "./ResultsTable";

import styles from "../styles/Homepage.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../types/States";

const Homepage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.movies.loading);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) dispatch(getMoviesFetch(inputRef.current?.value));
  };

  return (
    <div className={styles.container}>
      <h1>Find your movie</h1>
      <SearchInput ref={inputRef} handleSubmit={handleSubmit} />
      {loading ? <div>Loading...</div> : <ResultsTable />}
    </div>
  );
};

export default Homepage;
