"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useClan } from "@/context/ClanContext";
import { debounce } from "lodash"; // Or use a simple debounce helper if lodash isn't used

const SelectClan = () => {
  // Define the sizes for different breakpoints (in pixels)
  // Breakpoints are mobile-first: min-width
  // Order the breakpoints from largest to smallest
  const buttonSizeBreakpoints = [
    { breakpoint: 1536, size: { width: 280, height: 55 } }, // 2xl and up
    { breakpoint: 1280, size: { width: 300, height: 50 } }, // xl and up
    { breakpoint: 1024, size: { width: 220, height: 45 } }, // lg and up
    { breakpoint: 768, size: { width: 100, height: 40 } }, // md and up
    { breakpoint: 640, size: { width: 180, height: 35 } }, // sm and up
    { breakpoint: 0, size: { width: 150, height: 30 } }, // Default size (below sm)
  ];

  // State to hold the current button size based on window width
  const [buttonSize, setButtonSize] = useState({ width: 150, height: 30 }); // Initialize with the default size

  // Function to determine the button size based on current window width
  const calculateButtonSize = () => {
    // Check if window is available (for Next.js SSR compatibility)
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    // Iterate through defined breakpoints from largest to smallest
    for (const bp of buttonSizeBreakpoints) {
      if (width >= bp.breakpoint) {
        setButtonSize(bp.size); // Set state to the size of the first matching breakpoint
        return; // Stop checking once a match is found
      }
    }
    // Fallback (should not be reached with breakpoint: 0)
    setButtonSize(buttonSizeBreakpoints[buttonSizeBreakpoints.length - 1].size);
  };

  // Effect hook to handle window resize and update button size
  useEffect(() => {
    // Calculate the initial size on component mount
    calculateButtonSize();

    // Debounce the calculation function to limit updates during resizing
    const debouncedCalculateSize = debounce(calculateButtonSize, 100); // Adjust debounce time (100ms) if needed

    // Add the resize event listener
    window.addEventListener("resize", debouncedCalculateSize);

    // Cleanup function: Remove the event listener and cancel pending debounced calls on component unmount
    return () => {
      debouncedCalculateSize.cancel(); // Cancel any pending debounced calls
      window.removeEventListener("resize", debouncedCalculateSize);
    };
  }, []); // Re-run effect if breakpoints somehow change (unlikely but good practice)
  // Added buttonSizeBreakpoints to dependency array for correctness, though static

  const cardData = [
    {
      image: "/Images/introducingClans/card_1.png",
      hoverImage: "/Images/selectClan/sideImage2.png",
      cardImage: "/Images/selectClan/cardImg1.png",
      title: "Clan McBuilder",
      description: "We create the future with passion and code.",
      glowColor: "rgba(255, 0, 0, 0.8)",
    },
    {
      image: "/Images/introducingClans/card_2.png",
      hoverImage: "/Images/selectClan/sideImage1.png",
      cardImage: "/Images/selectClan/cardImg2.png",
      title: "McHODLer",
      description: "Diamond hands forever.",
      glowColor: "rgba(138, 43, 226, 0.8)",
    },
    {
      image: "/Images/introducingClans/card_3.png",
      hoverImage: "/Images/selectClan/sideImage3.png",
      cardImage: "/Images/selectClan/cardImg3.png",
      title: "Clan McDegen",
      description: "Risk is our middle name.",
      glowColor: "rgba(0, 255, 0, 0.8)",
    },
    {
      image: "/Images/introducingClans/card_4.png",
      hoverImage: "/Images/selectClan/sideImage4.png",
      cardImage: "/Images/selectClan/cardImg4.png",
      title: "Clan McPrivacy",
      description: "Privacy is our birthright.",
      glowColor: "rgba(0, 0, 255, 0.8)",
    },
  ];

  const defaultIndex = 1;

  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [displayedTitle, setDisplayedTitle] = useState<string>("");
  const [displayedDescription, setDisplayedDescription] = useState<string>("");

  const { setSelectedCard } = useClan();

  useEffect(() => {
    // On initial load, apply the same logic as if the user selected the default card
    const defaultCard = cardData[defaultIndex];
    setSelectedCard(defaultCard);
    setAvatarImage(defaultCard.hoverImage);
    setDisplayedTitle(defaultCard.title);
    setDisplayedDescription(defaultCard.description);
  }, []);

  return (
    <section className="relative bg-[url('/Images/gettingStarted/background.png')] bg-center bg-cover overflow-hidden flex flex-col min-h-screen">
      <div className="flex 2xl:gap-x-12 md:gap-x-4 flex-col gap-20 px-8 py-20 flex-grow mx-auto w-full max-w-screen-2xl">
        {/* Heading */}
        <div>
          <div className="flex gap-x-2 items-center">
            <div className="h-10 w-2 bg-purple-800"></div>
            <h2 className="lg:text-4xl md:text-2xl font-bold">
              {displayedTitle}
            </h2>
          </div>
          <p className="lg:text-3xl md:text-xl my-2">
            “{displayedDescription}”
          </p>
        </div>

        {/* Cards */}
        <div className="flex gap-12 items-center w-3/4 mx-0">
          {cardData.map((card, index) => (
            <div
              key={index}
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
                const active = cardData[activeIndex];
                setAvatarImage(active.hoverImage);
                setDisplayedTitle(active.title);
                setDisplayedDescription(active.description);
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
              {/* Glowing Background */}
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

              {/* Card Image Layer */}
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

              {/* Join Button */}
              <div
                className={clsx(
                  "absolute xl:bottom-[-100px] lg:bottom-[-80px] md:bottom-[-60px] left-0 w-full flex justify-center transition-opacity duration-300 ",
                  activeIndex === index ? "opacity-100" : "opacity-0"
                )}
              >
                <Link href="/CardPage" prefetch>
                  <Button
                    ButtonText="Join Clan"
                    width={buttonSize.width}
                    height={buttonSize.height}
                    className="md:text-[10px] lg:text-[16px]"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Avatar Section */}
        {avatarImage && (
          <Image
            src={avatarImage}
            height={500} // Intrinsic height hint
            width={400} // Intrinsic width hint
            className="absolute bottom-0 transition-all duration-500 ease-in-out
               // Responsive Avatar Size (Height and Width) - Controlled by these classes
               h-[200px] w-[160px] // Base size (mobile first)
               sm:h-[250px] sm:w-[200px]
               md:h-[600px] md:w-[340px]
               lg:h-[700px] lg:w-[420px]
               xl:h-[800px] xl:w-[400px]
               right-0 "
            alt="Clan Avatar"
          />
        )}
      </div>
    </section>
  );
};

export default SelectClan;
