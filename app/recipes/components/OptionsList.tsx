import { ChangeEvent } from "react";

type Props = {
  title: string;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: string[];
  promptParams: PromptParams;
};
export default function OptionsList({
  title,
  handleCheckboxChange,
  options,
  promptParams,
}: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <input
              type="checkbox"
              name={title.toLowerCase()}
              value={option}
              checked={promptParams.cuisines.includes(option)}
              onChange={handleCheckboxChange}
            />
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
