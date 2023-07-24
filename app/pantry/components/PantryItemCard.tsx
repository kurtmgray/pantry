import React, { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";

// add nutrition to ingredient schema

type Props = {
  pantryItem: PantryItem;
  itemStyles: { [key: string]: string };
  setPantryItems: Dispatch<SetStateAction<PantryItem[]>>;
};

export default function PantryItemCard({
  pantryItem,
  itemStyles,
  setPantryItems,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    console.log(pantryItem.id);
    try {
      const response = await fetch(`/api/ingredients/?id=${pantryItem.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Handle successful deletion, e.g., update state or fetch updated pantry items
        setPantryItems((prevPantryItems) => {
          return prevPantryItems.filter((item) => item.id !== pantryItem.id);
        });
        console.log("Item deleted successfully.");
      } else {
        console.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error while deleting item:", error);
    }
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
