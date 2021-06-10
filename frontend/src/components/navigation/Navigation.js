import { useRef } from "react";
import styles from "./navigation.module.scss";

const Navigation = () => {
  const ref = useRef();

  const inputHandler = () => {
    ref.current.checked = false;
  };
  return (
    <div className={styles.navigation}>
      <input
        type="checkbox"
        className={styles.navigation__checkbox}
        id="navi-toggle"
        ref={ref}
      />

      <label htmlFor="navi-toggle" className={styles.navigation__button}>
        <span className={styles.navigation__icon}>&nbsp;</span>
      </label>

      <div className={styles.navigation__background}>&nbsp;</div>

      <nav className={styles.navigation__nav}>
        <ul className={styles.navigation__list}>
          <li className={styles.navigation__item}>
            <a
              href="#top"
              className={styles.navigation__link}
              onClick={inputHandler}
            >
              <span>01</span>TOP OF THE PAGE
            </a>
          </li>
          <li className={styles.navigation__item}>
            <a
              href="#about"
              className={styles.navigation__link}
              onClick={inputHandler}
            >
              <span>02</span>About us
            </a>
          </li>
          <li className={styles.navigation__item}>
            <a
              href="#products"
              className={styles.navigation__link}
              onClick={inputHandler}
            >
              <span>03</span>Popular Products
            </a>
          </li>
          <li className={styles.navigation__item}>
            <a
              href="#review"
              className={styles.navigation__link}
              onClick={inputHandler}
            >
              <span>04</span>Reviews
            </a>
          </li>
          <li className={styles.navigation__item}>
            <a
              href="#contact"
              className={styles.navigation__link}
              onClick={inputHandler}
            >
              <span>05</span>Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
