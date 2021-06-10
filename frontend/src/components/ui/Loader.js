import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
