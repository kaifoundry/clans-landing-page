"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const SelectClan = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const cardData = [
    {
      image: "/Images/introducingClans/card_1.png",
      title: "Clan McBuilder",
      description: "We create the future with passion and code.",
      glowColor: "rgba(255, 0, 0, 0.8)", // 🔴 Red
    },
    {
      image: "/Images/introducingClans/card_2.png",
      title: "McHODLer",
      description: "Diamond hands forever.",
      glowColor: "rgba(138, 43, 226, 0.8)", // 🟣 Violet
    },
    {
      image: "/Images/introducingClans/card_3.png",
      title: "Clan McDegen",
      description: "Risk is our middle name.",
      glowColor: "rgba(0, 255, 0, 0.8)", // 🟢 Green
    },
    {
      image: "/Images/introducingClans/card_4.png",
      title: "Clan McPrivacy",
      description: "Privacy is our birthright.",
      glowColor: "rgba(0, 0, 255, 0.8)", // 🔵 Blue
    },
  ];

  return (
    <div className="relative main-section overflow-y-hidden flex flex-col font-rajdhani">
      {/* Heading */}
      <div className="absolute top-0 left-0 px-15 mt-10">
        <div className="flex gap-x-2 items-center">
          <div className="h-10 w-2 bg-purple-800"></div>
          <h2 className="lg:text-4xl md:text-2xl font-bold">Clan McHODLer</h2>
        </div>
        <p className="lg:text-3xl md:text-xl my-2">“Diamond hands forever”</p>
        <div className="lg:w-2/3 md:w-1/2">
          <p className="2xl:text-2xl md:text-lg">
            Clan Nakas: We build the blockchain and believe in holding strong
            for the future. Like diamonds, we're resilient and patient,
            weathering any storm to build lasting wealth. Join us – our strong
            hands hold the future, and we never let go!
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full flex 2xl:gap-x-12 2xl:mt-25 md:gap-x-4 items-start p-8 xl:mt-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={clsx(
              "relative group cursor-pointer transition-all duration-500",
              "xl:h-[400px] xl:w-[220px] md:h-[200px] md:w-[100px] h-[280px] w-[158px] lg:w-[150px] lg:h-[300px]",
              activeIndex === index ? "scale-105" : "scale-100"
            )}
            style={{
              filter:
                activeIndex === index
                  ? `drop-shadow(0 0 20px ${card.glowColor}) drop-shadow(0 0 50px ${card.glowColor})`
                  : "none",
              transition: "filter 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* Glowing Background Wrapper */}
            <div
              className="absolute inset-0 bg-[${card.glowColor})] rounded-xl transition-all duration-500"
              style={{
                clipPath:
                  "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                boxShadow:
                  activeIndex === index
                    ? `0 0 20px ${card.glowColor}, 0 0 40px ${card.glowColor}`
                    : "none",
                transition: "box-shadow 0.5s ease",
                backgroundColor:
                  activeIndex === index ? card.glowColor : "transparent",
              }}
            ></div>

            {/* Card Image Layer */}
            <div
              className="absolute inset-[4px] text-white bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
              style={{
                clipPath:
                  "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                backgroundImage: `url(${card.image})`,
              }}
            >
              <h3
                className="lg:text-xl md:text-[12px] font-bold text-center px-2 absolute bottom-10"
                style={{
                  textShadow:
                    "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8)",
                }}
              >
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Join Clan Button */}
      <div className="absolute bottom-10 left-88 z-1">
        <Link href="/CardPage" prefetch>
          <Button ButtonText="Join Clan" width={250} height={50} />
        </Link>
      </div>

      {/* Background Avatar */}
      <Image
        src="/Images/selectClan/bgAvtar.png"
        height={400}
        width={400}
        alt="bgAvtar"
        className="absolute top-10 right-0"
      />
    </div>
  );
};

export default SelectClan;
