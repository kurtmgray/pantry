import { ChangeEvent } from "react";
import styles from "../Recipes.module.css";

type Props = {
  options: string[] | number[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  placeholder?: string;
};

export default function SelectInput({
  options,
  value,
  onChange,
  name,
  placeholder,
}: Props) {
  return (
    <select
      className={styles.selectInput}
      value={value}
      name={name}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
