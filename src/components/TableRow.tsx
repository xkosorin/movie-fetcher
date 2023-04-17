import { useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/TableRow.module.scss";
import { useDispatch } from "react-redux";
import {
  addToFavorites,
  getFavoriteMovies,
  removeFromFavorites,
} from "../store/movies/moviesSlice";
import { IMovie } from "../types/Movies";
import { useSelector } from "react-redux";

interface Props {
  movie: IMovie;
}

const TableRow = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites: IMovie[] = useSelector(getFavoriteMovies);

  const isFavorite: boolean = favorites.some(
    (movie) => movie.imdbID === props.movie.imdbID
  );

  const handleAddToFavoritesClick = () => {
    dispatch(addToFavorites(props.movie));
  };

  const handleRemoveFromFavoritesClick = () => {
    dispatch(removeFromFavorites(props.movie));
  };

  const handleTitleClick = (movieID: string) => {
    navigate(`/movie/${movieID}`);
  };

  return (
    <tr className={styles.tableRow}>
      <td className={styles.movieImage}>
        <img src={props.movie.Poster} className={styles.image} />
      </td>
      <td
        className={styles.movieInfo}
        onClick={(_) => handleTitleClick(props.movie.imdbID)}
      >
        <span className={styles.movieTitle}>{props.movie.Title}</span>
        <span className={styles.movieYear}>{props.movie.Year}</span>
      </td>
      <td className={styles.movieLiked}>
        {isFavorite ? (
          <FontAwesomeIcon
            icon={faHeart}
            style={{ cursor: "pointer" }}
            onClick={handleRemoveFromFavoritesClick}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeartRegular}
            style={{ cursor: "pointer" }}
            onClick={handleAddToFavoritesClick}
          />
        )}
      </td>
    </tr>
  );
};

export default TableRow;
