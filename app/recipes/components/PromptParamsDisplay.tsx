import React from "react";
import { camelCaseToWords } from "@/lib/camelCaseToWords";

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
    <div>
      <h3>{formatTitle(title)}:</h3>
      <ul>
        {selectedOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}
