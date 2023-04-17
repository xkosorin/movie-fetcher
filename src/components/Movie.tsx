import { ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import styles from "../styles/Movie.module.scss";
import {
  getError,
  getFavoriteMovies,
  getLoading,
  getMovieDetails,
  getSingleMovieFetch,
} from "../store/movies/moviesSlice";

type JSONValue = string | number | boolean | Record<string, string>[];
type EntriesArray = [string, JSONValue][];

const Movie = () => {
  const { id } = useParams();

  const fetchError = useSelector(getError);
  const loading = useSelector(getLoading);
  const movieDetails = useSelector(getMovieDetails);
  const favorites = useSelector(getFavoriteMovies);

  var entries: EntriesArray | undefined = undefined;
  var unwantedKeys = ["Poster", "Title"];

  const dispatch = useDispatch();

  if (id) {
    useEffect(() => {
      dispatch(getSingleMovieFetch(id));
    }, []);
  }

  // Makes entries of movie object iterable to be able to loop through them
  if (movieDetails) {
    entries = Object.entries(movieDetails).filter(
      ([key]) => !unwantedKeys.includes(key)
    );
  } else {
    if (!loading) return <>Wrong ID!</>;
  }

  if (fetchError) return <>Fetching error!</>;

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles["title-container"]}>
            <span className={styles.title}>{movieDetails?.Title}</span>
            <span className={styles.liked}>
              {favorites.some(
                (movie) => movie.imdbID === movieDetails?.imdbID
              ) ? (
                <FontAwesomeIcon icon={faHeart} style={{ cursor: "pointer" }} />
              ) : (
                <FontAwesomeIcon
                  icon={faHeartRegular}
                  style={{ cursor: "pointer" }}
                />
              )}
            </span>
          </div>
          <div className={styles.grid}>
            <div className={styles.poster}>
              <img src={movieDetails?.Poster} />
            </div>
            <div className={styles.info}>
              {entries &&
                entries.map(([key, value], idx) => {
                  if (key === "Ratings") {
                    value = (value as Record<string, string>[])
                      .map((rating) => `${rating.Source}: ${rating.Value}`)
                      .join(", ");
                  }

                  return (
                    <span key={idx}>
                      <div className={styles.param}>{key}:</div>
                      <div>{value as ReactNode}</div>
                    </span>
                  );
                })}
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Movie;
