import React, { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";

// working on hover div
// add nutrition to ingredient schema

type Props = {
  pantryItem: PantryItem;
  itemStyles: { [key: string]: string };
};

export default function PantryItemCard({ pantryItem, itemStyles }: Props) {
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
    try {
      // Replace 'your_delete_endpoint' with the actual endpoint to delete the item
      const response = await fetch(`/api/ingredients/${pantryItem.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Handle successful deletion, e.g., update state or fetch updated pantry items
        console.log("Item deleted successfully.");
      } else {
        console.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  //   const handleMouseLeave = () => {
  //     setIsHovered(false);
  //     setMousePosition({ x: 0, y: 0 });
  //   };

  //   const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
  //     const { clientX, clientY } = event;
  //     setMousePosition({ x: clientX, y: clientY });
  //   };

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
