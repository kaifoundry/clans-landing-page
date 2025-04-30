"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useClan } from "@/context/ClanContext";

const SelectClan = () => {
  const cardData = [
    {
      id: 1,
      image: "/Images/introducingClans/card_1.png",
      hoverImage: "/Images/selectClan/sideImage2.png",
      cardImage: "/Images/selectClan/cardImg1.png",
      title: "Clan McBuilder",
      description: "We create the future with passion and code.",
      glowColor: "rgba(255, 0, 0, 0.8)",
    },
    {
      id: 2,
      image: "/Images/introducingClans/card_2.png",
      hoverImage: "/Images/selectClan/sideImage1.png",
      cardImage: "/Images/selectClan/cardImg2.png",
      title: "McHODLer",
      description: "Diamond hands forever.",
      glowColor: "rgba(138, 43, 226, 0.8)",
    },
    {
      id: 3,
      image: "/Images/introducingClans/card_3.png",
      hoverImage: "/Images/selectClan/sideImage3.png",
      cardImage: "/Images/selectClan/cardImg3.png",
      title: "Clan McDegen",
      description: "Risk is our middle name.",
      glowColor: "rgba(0, 255, 0, 0.8)",
    },
    {
      id: 4,
      image: "/Images/introducingClans/card_4.png",
      hoverImage: "/Images/selectClan/sideImage4.png",
      cardImage: "/Images/selectClan/cardImg4.png",
      title: "Clan McPrivacy",
      description: "Privacy is our birthright.",
      glowColor: "rgba(0, 0, 255, 0.8)",
    },
  ];

  const { selectedCardId } = useClan();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [displayedTitle, setDisplayedTitle] = useState<string>("");
  const [displayedDescription, setDisplayedDescription] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<null | (typeof cardData)[0]>(
    null
  );

  useEffect(() => {
    if (selectedCardId !== null) {
      const card = cardData.find((card) => card.id === selectedCardId);
      if (card) {
        setSelectedCard(card);
        setAvatarImage(card.hoverImage);
        setDisplayedTitle(card.title);
        setDisplayedDescription(card.description);
        setActiveIndex(cardData.findIndex((c) => c.id === selectedCardId));
      }
    }
  }, [selectedCardId]);

  return (
    <section className="main-section p-4 overflow-hidden">
      <div className="relative w-full overflow-hidden flex justify-start flex-col gap-4">
        <h1 className="text-2xl text-center font-bold">Claim your Clan</h1>
        <p className="text-center">
          Long ago, clans rose from code and chaos.
          <br />
          Now, they return — and they want you.
        </p>

        <div className="flex gap-x-2 items-center mt-10">
          <div className="h-10 w-1 bg-[#9747FF]"></div>
          <h2 className="text-2xl font-bold">{displayedTitle}</h2>
        </div>
        <p className="text-xl">{displayedDescription}</p>

        <div className="w-1/2 grid grid-cols-2 gap-6 justify-items-center">
          {cardData.map((card, index) => (
            <div
              key={card.id}
              onClick={() => {
                setActiveIndex(index);
                setAvatarImage(card.hoverImage);
                setSelectedCard(card);
                setDisplayedTitle(card.title);
                setDisplayedDescription(card.description);
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setAvatarImage(card.hoverImage);
                setDisplayedTitle(card.title);
                setDisplayedDescription(card.description);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                if (activeIndex !== null) {
                  const active = cardData[activeIndex];
                  setAvatarImage(active.hoverImage);
                  setDisplayedTitle(active.title);
                  setDisplayedDescription(active.description);
                }
              }}
              className={clsx(
                "relative h-[130px] w-[75px] cursor-pointer",
                activeIndex === index ? "scale-105" : "scale-100"
              )}
              style={{
                filter:
                  activeIndex === index || hoveredIndex === index
                    ? `drop-shadow(0 0 1px ${card.glowColor}) drop-shadow(0 0 6px ${card.glowColor})`
                    : "none",
                transition: "filter 0.4s ease, transform 0.4s ease",
              }}
            >
              <div
                className="absolute inset-0 rounded-xl transition-all duration-500"
                style={{
                  clipPath:
                    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                  boxShadow:
                    activeIndex === index || hoveredIndex === index
                      ? `0 0 2px ${card.glowColor}, 0 0 10px ${card.glowColor}`
                      : "none",
                  backgroundColor:
                    activeIndex === index || hoveredIndex === index
                      ? card.glowColor
                      : "white",
                }}
              ></div>

              <div
                className="absolute inset-[4px] text-white bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
                style={{
                  clipPath:
                    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                  backgroundImage: `url(${card.image})`,
                  transition: "background-image 0.4s ease",
                }}
              >
                <h3
                  className="text-[12px] font-medium text-center px-2 absolute bottom-0"
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

        <div className="w-full flex items-center justify-center z-1 mt-20">
          {selectedCard && (
            <Link href={`/CardPage?selectedCardId=${selectedCard.id}`}>
              <Button ButtonText="Join Clan" width={250} height={50} />
            </Link>
          )}
        </div>
      </div>

      {avatarImage && (
        <Image
          src={avatarImage}
          height={280}
          width={220}
          alt="bgAvatar"
          className="absolute bottom-0 right-0"
        />
      )}
    </section>
  );
};

export default SelectClan;
