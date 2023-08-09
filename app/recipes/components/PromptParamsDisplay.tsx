import React from "react";
import styles from "../Recipes.module.css";

type Props = {
  title: string;
  selectedOptions: string[];
  formatTitle: (title: string) => string;
};

export default function PromptParamsDisplay({
  title,
  selectedOptions,
  formatTitle,
}: Props) {
  return (
    <div className={styles.PromptParamsDisplay}>
      <p>
        {formatTitle(title)}: {selectedOptions.join(", ")}
      </p>
    </div>
  );
}
