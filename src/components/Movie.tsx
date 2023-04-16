import { useParams } from "react-router-dom";
import { IMovie } from "../types/Movies";
import { useSelector } from "react-redux";
import { getMovieById } from "../store/movies/moviesSlice";
import { RootState } from "../types/States";

import styles from "../styles/Movie.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Movie = () => {
  const { id } = useParams();

  var movieObj: IMovie | undefined;

  if (id) movieObj = useSelector((state: RootState) => getMovieById(state, id));

  console.log(movieObj);

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
          {for (const attr in movieObj) {
                        <div className={styles.param}>Param:</div>
                        <div className={styles.text}>Text</div>
          }}
        </div>
      </div>
    </div>
  );
};

export default Movie;
