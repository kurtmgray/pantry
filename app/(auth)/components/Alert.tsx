import React from "react";
type Props = {
  error: string;
};

export default function Alert({ error }: Props) {
  // fix this inline style
  return <h3 style={{ color: "red" }}>{error}</h3>;
}
