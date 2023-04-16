import { Link } from "react-router-dom";

import styles from "../styles/Navbar.module.scss";

const Navbar = () => (
  <nav className={styles.navbar}>
    <ul className={styles["navbar-menu"]}>
      <li>
        <Link to="/">Homepage</Link>
      </li>
      <li>
        <Link to="/my-favorites">My favorites</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
