import { useParams } from "react-router-dom";
import { IMovie } from "../types/Movies";
import { useSelector } from "react-redux";
import { getMovieById } from "../store/movies/moviesSlice";
import { RootState } from "../types/States";

import styles from "../styles/Movie.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

type JSONValue = string | number | boolean | Record<string, string>[];

type EntriesArray = [string, JSONValue][];

const Movie = () => {
  const { id } = useParams();

  var movieObj: IMovie | undefined = undefined;

  if (id) movieObj = useSelector((state: RootState) => getMovieById(state, id));

  var entries: EntriesArray | undefined = undefined;
  var unwantedKeys = ["Poster", "Title"];
  if (movieObj)
    entries = Object.entries(movieObj).filter(
      ([key]) => !unwantedKeys.includes(key)
    );

  return (
    <div className={styles.container}>
      <div className={styles["title-container"]}>
        <span className={styles.title}>{movieObj?.Title}</span>
        <span className={styles.liked}>
          <FontAwesomeIcon icon={faHeart} style={{ cursor: "pointer" }} />
        </span>
      </div>
      <div className={styles.grid}>
        <div className={styles.poster}>
          <img src={movieObj?.Poster} />
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
                <>
                  <div key={idx} className={styles.param}>
                    {key}:
                  </div>
                  <div>{value as ReactNode}</div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Movie;
