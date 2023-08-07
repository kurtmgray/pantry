export function camelCaseToWords(camelCaseString: string) {
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