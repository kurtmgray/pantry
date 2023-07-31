import React from "react";

type Props = {
  title: string;
  selectedOptions: string[] | string;
};

export default function PromptParamsDisplay({ title, selectedOptions }: Props) {
  if (typeof selectedOptions === "string") {
    return <div>{selectedOptions}</div>;
  }
  return (
    <div>
      <h3>{title}:</h3>
      <ul>
        {selectedOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}
