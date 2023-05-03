type Props = {
  params: {
    id: string;
  };
};
export default function Recipe({ params: { id } }: Props) {
  return (
    <div>
      <h3>This is the page id: {id}</h3>
      <h3>
        Page displaying detailed information about a specific recipe, including
        a list of ingredients and their amounts, detailed instructions, and
        nutritional information
      </h3>
    </div>
  );
}
