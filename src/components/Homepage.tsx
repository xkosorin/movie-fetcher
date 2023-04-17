import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  getMovies,
  getMoviesFetch,
} from "../store/movies/moviesSlice";

import SearchInput from "./SearchInput";
import ResultsTable from "./ResultsTable";

import styles from "../styles/Homepage.module.scss";
import { RootState } from "../types/States";
import Pagination from "./Pagination";

const Homepage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const movies = useSelector(getMovies);
  const totalPages = useSelector((state: RootState) => state.movies.totalPages);
  const currentPage = useSelector(
    (state: RootState) => state.movies.currentPage
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current)
      dispatch(
        getMoviesFetch({ searchTerm: inputRef.current?.value, page: 1 })
      );
  };

  const handlePageChange = (newPage: number) => {
    if (inputRef.current) {
      dispatch(
        getMoviesFetch({ searchTerm: inputRef.current.value, page: newPage })
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1>Find your movie</h1>
      <SearchInput ref={inputRef} handleSubmit={handleSubmit} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ResultsTable movies={movies} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Homepage;
