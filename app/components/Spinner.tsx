import React from "react";
import styles from "./SearchBar.module.css";

export default function Spinners() {
  return (
    <span className={styles.spinner}>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </span>
  );
}
