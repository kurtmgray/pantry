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
      className={`${itemStyles.pantryItem_card} ${isHovered ? "hovered" : ""}`}
      onClick={handleMouseClick}
      key={pantryItem.id}
    >
      <h3>{pantryItem.label}</h3>
      <Image
        src={pantryItem.image}
        height={100}
        width={100}
        alt={pantryItem.knownAs}
      />
      {/* {isHovered && (
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
          <p>Nutrition: {pantryItem.nutrients["chocdf"]}</p>
        </div>
      )} */}
    </div>
  );
}
