import React, { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";

// working on hover div

type Props = {
  pantryItem: PantryItem;
  itemStyles: { [key: string]: string };
};

export default function PantryItemCard({ pantryItem, itemStyles }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <div
      className={`${itemStyles.pantryItem_card} ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={(e) => handleMouseMove(e)}
      key={pantryItem.id}
    >
      <h3>{pantryItem.label}</h3>
      <Image
        src={pantryItem.image}
        height={100}
        width={100}
        alt={pantryItem.knownAs}
      />
      {isHovered && (
        <div
          className="hover-message"
          style={{
            position: "absolute",
            left: mousePosition.x,
            top: mousePosition.y,
            backgroundColor: "white",
          }}
        >
          <p>Nutrition: {pantryItem.knownAs}</p>
        </div>
      )}
    </div>
  );
}
