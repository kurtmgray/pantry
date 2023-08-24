import React, { useState, MouseEvent } from "react";
import { useGlobalState } from "@/app/providers";
import { deletePantryItem } from "@/app/services/api/deletePantryItem";
import Image from "next/image";

// add nutrition to ingredient schema

type Props = {
  pantryItem: PantryItem;
  itemStyles: { [key: string]: string };
};

export default function PantryItemCard({ pantryItem, itemStyles }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { setState } = useGlobalState();

  const handleMouseClick = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      setMousePosition({ x: clientX, y: clientY });
    } else {
      setMousePosition({ x: 0, y: 0 });
    }
    setIsHovered(!isHovered);
  };

  const handleDeleteItem = async () => {
    // TODO: try/catch to keep state in sync with db

    const deletedItemId = await deletePantryItem(pantryItem.id);

    setState((state: GlobalState) => {
      return {
        ...state,
        pantry: state.pantry.filter((item) => item.id !== deletedItemId),
      };
    });
  };

  return (
    <div
      className={`${itemStyles.pantryItemCard} ${
        isHovered && itemStyles.darken
      }`}
      onClick={handleMouseClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{pantryItem.label}</h3>
      <Image
        className={itemStyles.pantryItemImage}
        src={pantryItem.image}
        height={100}
        width={100}
        alt={pantryItem.knownAs}
      />
      {isHovered && (
        <button className={itemStyles.deleteButton} onClick={handleDeleteItem}>
          Delete
        </button>
      )}
    </div>
  );
}
