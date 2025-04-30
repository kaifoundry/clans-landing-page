"use client";

import { useState } from "react";

type CardProps = {
  image: string;
  hoverImage?: string;
  title: string;
  description: string;
  width?: string;
  height?: string;
  glowColor?: string; // Added glowColor prop
};

const Card = ({
  image,
  hoverImage,
  title,
  description,
  glowColor = "red",
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const clipPathStyle =
    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)";

  return (
    <div
      className="flex flex-col items-center gap-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className="relative xl:h-[480px] xl:w-[268px]  lg:h-[400px] lg:w-[220px] md:h-[300px] md:w-[200px] h-[280px] w-[158px]"
        style={{
          transition: "border 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Dynamic Border with glowColor */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: clipPathStyle,
            backgroundColor: isHovered ? glowColor : "white", // Dynamically set background color
            transition: "background-color 0.3s ease", // Smooth transition for background color
            boxShadow: isHovered ? `0 0 10px ${glowColor}` : "none", // Glow effect on hover
          }}
        />

        <div className="">
          <div
            className="absolute inset-[3px]"
            style={{ clipPath: clipPathStyle }}
          >
            {/* Default Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
            {/* Hover Image */}
            {hoverImage && (
              <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url(${hoverImage})` }}
              />
            )}
          </div>
        </div>
        {/* Image Layer */}
      </div>

      {/* Title Below Card */}
      <h3
        className="text-lg font-bold text-white text-center "
        style={{
          textShadow:
            "0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.8), 0 0 15px rgba(255,255,255,1)",
        }}
      >
        {title}
      </h3>
    </div>
  );
};

export default Card;
