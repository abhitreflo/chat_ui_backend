import React from "react";
import styles from "./loading.module.css";

function Loading() {
  return (
    <div className={styles.loading_bg}>
      <div className={styles.loadBody}>
        <div className={styles.logoSlot}></div>

        <div className={styles.loadTxt}>LOADING......</div>
      </div>
    </div>
  );
}

export default Loading;
