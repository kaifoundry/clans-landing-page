"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useClan } from "@/context/ClanContext";
import { debounce } from "lodash";

const SelectClan = () => {
  //Dynamic Button Code
  const buttonSizeBreakpoints = [
    { breakpoint: 1536, size: { width: 280, height: 55 } },
    { breakpoint: 1280, size: { width: 300, height: 50 } },
    { breakpoint: 1024, size: { width: 220, height: 45 } },
    { breakpoint: 768, size: { width: 100, height: 40 } },
    { breakpoint: 640, size: { width: 180, height: 35 } },
    { breakpoint: 0, size: { width: 150, height: 30 } },
  ];
  const [buttonSize, setButtonSize] = useState({ width: 150, height: 30 });
  const calculateButtonSize = () => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    for (const bp of buttonSizeBreakpoints) {
      if (width >= bp.breakpoint) {
        setButtonSize(bp.size);
        return;
      }
    }
    setButtonSize(buttonSizeBreakpoints[buttonSizeBreakpoints.length - 1].size);
  };
  useEffect(() => {
    calculateButtonSize();
    const debouncedCalculateSize = debounce(calculateButtonSize, 100);
    window.addEventListener("resize", debouncedCalculateSize);
    return () => {
      debouncedCalculateSize.cancel();
      window.removeEventListener("resize", debouncedCalculateSize);
    };
  }, []);

  //card Data
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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [displayedTitle, setDisplayedTitle] = useState<string>("");
  const [displayedDescription, setDisplayedDescription] = useState<string>("");

  const { selectedCardId, setSelectedCardId } = useClan();

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
      }
    }
  }, [selectedCardId]);

  const handleSelectId = (id: number) => {
    setSelectedCardId(id);
    console.log(id);
  };

  let clickTimeout: NodeJS.Timeout;

  return (
    <section className="relative bg-[url('/Images/gettingStarted/background.png')] bg-center bg-cover overflow-hidden flex flex-col min-h-screen">
      <div className="flex 2xl:gap-x-12 md:gap-x-4 flex-col gap-20 px-8 py-20 flex-grow mx-auto w-full max-w-screen-2xl">
        <div className="text-white">
          <div className="flex gap-x-2 items-center">
            <div className="h-10 w-2 bg-purple-800"></div>
            <h2 className="lg:text-4xl md:text-2xl font-bold text-white">
              {displayedTitle}
            </h2>
          </div>
          <p className="lg:text-3xl md:text-xl my-2 text-white">
            “{displayedDescription}”
          </p>
        </div>

        <div className="flex gap-12 items-center w-3/4 mx-0 lg:flex-col-4 md:flex-col-2">
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
                "relative group cursor-pointer transition-all duration-500",
                "xl:h-[400px] xl:w-[220px] md:h-[200px] md:w-[100px] h-[280px] w-[158px] lg:w-[150px] lg:h-[300px]",
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
                  className="lg:text-xl md:text-[12px] font-bold text-center px-2 absolute bottom-10"
                  style={{
                    textShadow:
                      "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8)",
                  }}
                >
                  {card.title}
                </h3>
              </div>

              <div
                className={clsx(
                  "absolute xl:bottom-[-100px] lg:bottom-[-80px] md:bottom-[-60px] left-0 w-full flex justify-center transition-opacity duration-300 ",
                  activeIndex === index ? "opacity-100" : "opacity-0"
                )}
              >
                <Link
                  href={`/CardPage`}
                  onClick={() => handleSelectId(card.id)}
                >
                  <Button
                    ButtonText="Join Clan" // This is static, but you can make it dynamic if needed
                    width={buttonSize.width}
                    height={buttonSize.height}
                    className="md:text-[10px] lg:text-[16px]"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {avatarImage && (
          <div className="absolute bottom-0 ease-in-out right-0">
            <Image
              src={avatarImage}
              height={385}
              width={385}
              className="object-contain transition-all duration-500 ease-in-out"
              alt="Clan avatar"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectClan;
