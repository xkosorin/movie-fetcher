import React, { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/Input.module.scss";

const SearchInput = forwardRef<HTMLInputElement>((_, ref) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ref && console.log(ref.current.value);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={ref}
      />
      <button type="submit" className={styles["search-icon"]}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
});

export default SearchInput;
