import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import styles from "../styles/TableRow.module.scss";

interface Props {
  movieId: string;
  img: string;
  title: string;
  year: string;
  genre: string;
  rating: string;
  favorite: boolean;
}

const TableRow = (props: Props) => {
  const navigate = useNavigate();

  const handleFavoriteClick = (e: MouseEvent) => {
    console.log("Added to favorite");
  };

  const handleTitleClick = (movieID: string) => {
    navigate(`/movie/${movieID}`);
  };

  return (
    <tr className={styles.tableRow}>
      <td className={styles.movieImage}>
        <img src={props.img} className={styles.image} />
      </td>
      <td
        className={styles.movieInfo}
        onClick={(_) => handleTitleClick(props.movieId)}
      >
        <span className={styles.movieTitle}>{props.title}</span>
        <span className={styles.movieYear}>{props.year}</span>
      </td>
      <td className={styles.movieGenre}>{props.genre}</td>
      <td className={styles.movieRating}>{props.rating}</td>
      <td className={styles.movieLiked}>
        {props.favorite && (
          <FontAwesomeIcon
            icon={faHeart}
            onClick={(e) => handleFavoriteClick(e)}
            style={{ cursor: "pointer" }}
          />
        )}
      </td>
    </tr>
  );
};

export default TableRow;
