import { ChangeEvent } from "react";
import styles from "../Recipes.module.css";

type Props = {
  title: CheckboxNames;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formatTitle: (title: string) => string;
  options: string[];
  promptParams: PromptParams;
};
export default function OptionsList({
  title,
  handleCheckboxChange,
  formatTitle,
  options,
  promptParams,
}: Props) {
  return (
    <div className={styles.optionsList}>
      <h2>{formatTitle(title)}</h2>
      <ul>
        {options.sort().map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              name={title}
              value={option}
              checked={promptParams[title].includes(option)}
              onChange={handleCheckboxChange}
            />
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
