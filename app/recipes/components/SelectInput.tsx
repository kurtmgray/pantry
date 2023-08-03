import React from "react";

type Props = {
  options: string[] | number[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
  console.log(options);
  return (
    <select value={value} name={name} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
