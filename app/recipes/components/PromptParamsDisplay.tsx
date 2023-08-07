import React from "react";

type Props = {
  title: string;
  selectedOptions: string[];
};

function camelCaseToWords(camelCaseString: string) {
  let words = [];
  let word = "";
  for (let i = 0; i < camelCaseString.length; i++) {
    let char = camelCaseString[i];
    if (char === char.toUpperCase() && word) {
      words.push(word);
      word = char;
    } else {
      word += char;
    }
  }
  words.push(word);

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function PromptParamsDisplay({ title, selectedOptions }: Props) {
  return (
    <div>
      <h3>{camelCaseToWords(title)}:</h3>
      <ul>
        {selectedOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}
