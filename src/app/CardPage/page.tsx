"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useClan } from "@/context/ClanContext";

export default function CardPage() {
  const { selectedCardId } = useClan();

  const [card, setCard] = useState<null | {
    id: number;
    title: string;
    description: string;
    image: string;
    glowColor: string;
  }>(null);

  type Card = {
    id: number;
    title: string;
    description: string;
    image: string;
    glowColor: string;
  };

  // Card data array (this should come from context or a global state)
  const cardData: Card[] = [
    {
      id: 1,
      image: "/Images/selectClan/cardImg1.png",
      title: "Clan McBuilder",
      description: "We create the future with passion and code.",
      glowColor: "rgba(255, 0, 0, 0.5)", // Red with 50% transparency
    },
    {
      id: 2,
      image: "/Images/selectClan/cardImg2.png",
      title: "McHODLer",
      description: "Diamond hands forever.",
      glowColor: "rgba(128, 0, 128, 0.5)", // Purple with 50% transparency
    },
    {
      id: 3,
      image: "/Images/selectClan/cardImg3.png",
      title: "Clan McDegen",
      description: "Risk is our middle name.",
      glowColor: "rgba(0, 255, 0, 0.5)", // Green with 50% transparency
    },
    {
      id: 4,
      image: "/Images/selectClan/cardImg4.png",
      title: "Clan McPrivacy",
      description: "Privacy is our birthright.",
      glowColor: "rgba(0, 0, 255, 0.5)", // Blue with 50% transparency
    },
  ];
  // Effect to load the correct card based on the query parameter
  // useEffect(() => {
  //   console.log(selectedCardId)
  //   const selectedCardId = searchParams.get("selectedCardId"); // Extract the selectedCardId from the URL

  //   if (selectedCardId) {
  //     const selectedCard = cardData.find(
  //       (card) => card.id === parseInt(selectedCardId)
  //     );
  //     setCard(selectedCard || null); // Set the selected card details or null if not found
  //   }
  // }, [searchParams]); // Ensure the effect runs when searchParams change

  useEffect(() => {
    console.log(selectedCardId);
    if (selectedCardId !== null) {
      const card = cardData.find((card) => card.id === selectedCardId);
      if (card) {
        setCard(card);
      }
    }
  }, [selectedCardId]);

  if (!card) return <div>Loading...</div>; // Handle the case when card is not found

  // Construct tweet content dynamically based on selectedCard title and description
  const tweetContent = `I don’t tweet anymore.\n\nI Roar - with Clan ${card.title} ⚔ behind me.\n\nPrivacy is power. Roar wisely.\n\nChoose your Clan & join the waitlist 👉 ${card.description}\n\nCheck out my Clan's card: ${card.image}`;

  // Construct the absolute URL for the image
  const fullImageURL = `${window.location.origin}${card.image}`; // Create full URL for the image

  // Construct Twitter URL with the encoded tweet content and absolute image URL
  const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetContent
  )}&url=${encodeURIComponent(fullImageURL)}`;

  // Function to handle Twitter share
  const handleShareClick = () => {
    window.open(twitterShareURL, "_blank", "width=600,height=400");
  };

  // Function to handle Continue button click
  const handleContinueClick = () => {
    handleShareClick(); // Call the share function when "Continue" is clicked
    // window.location.href = "/JoinWaitlist"; // Navigate to JoinWaitlist page after sharing
  };

  const handleRedirect = () => {
    window.location.href = "/JoinWaitlist";
  };

  return (
    <section className="main-section p-4">
      <div className="flex flex-col items-center justify-center py-5 px-5">
        {/* <h1 className="md:text-5xl font-bold mb-10 text-3xl">
          You are now certified{" "}
          <span className="text-purple-500">Clans Roarer!</span>
        </h1> */}
        <h1 className="text-center md:text-left md:text-5xl font-bold mb-10 text-3xl">
  You are now certified{" "}
  <span className="text-purple-500">Clans Roarer!</span>
</h1>

        {/* <div
          className="rounded-xl opacity-70 backdrop-blur-2xl 2xl:w-[1300px] xl:h-[542px] xl:w-[1200px] md:w-[700px] h-[400px] w-[400px] relative"
          style={{
            backgroundColor: card.glowColor,
          }}
        >
          <div className="absolute inset-[20px] rounded-xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center">
            <div className="flex flex-col p-10 gap-y-10">
              <div className="flex flex-row">
                <Image
                  src="/Images/cardPage/avtar_1.png"
                  alt="userProfilePic"
                  height={100}
                  width={100}
                  className="rounded-full h-20 w-20 border-white border-2"
                />
                <div className="flex flex-col py-4 px-2">
                  <p>Yashika</p>
                  <p>yashika@gmail.com</p>
                </div>
              </div>

              <p>
                I don’t tweet anymore. I Roar - with Clan {card.title} behind
                me.
                <br />
                Privacy is power. Roar wisely.
              </p>

              <div className="">
                <h1 className="text-purple-500 text-4xl font-semibold">
                  {card.title}
                </h1>
                <p className="text-lg">{card.description}</p>
              </div>
              <div className="hidden lg:flex items-center mt-10 gap-2">
                <Image
                  src="/Images/gettingStarted/Object.png"
                  width={100}
                  height={100}
                  className="w-10 h-20 object-contain"
                  alt="Object1"
                />
                <Image
                  src="/Images/gettingStarted/Clans.png"
                  width={100}
                  height={100}
                  className="w-20 h-15 object-contain"
                  alt="Clans"
                />
              </div>
            </div>
            <Image
              src={card.image} // Changed from card.cardImage to card.image
              alt="Avatar_1"
              width={450}
              height={300}
              className="absolute bottom-0 right-0 h-[250px] w-[220px] xl:w-1/3 xl:h-[90%]"
            />
          </div>
        </div> */}
        <div
  className="rounded-xl opacity-70 backdrop-blur-2xl 
    w-[90%] max-w-[400px] h-[400px] 
    sm:max-w-[500px] sm:h-[420px]
    md:max-w-[700px] md:h-[450px]
    xl:w-[1200px] xl:h-[542px] 
    2xl:w-[1300px]
    relative mx-auto"
  style={{
    backgroundColor: card.glowColor,
  }}
>
  <div className="absolute inset-[16px] sm:inset-[20px] rounded-xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center">
    <div className="flex flex-col p-6 sm:p-10 gap-y-6 sm:gap-y-10">
      {/* Avatar Row */}
      <div className="flex flex-row">
        <Image
          src="/Images/cardPage/avtar_1.png"
          alt="userProfilePic"
          height={100}
          width={100}
          className="rounded-full h-16 w-16 sm:h-20 sm:w-20 border-white border-2"
        />
        <div className="flex flex-col py-2 px-2 sm:py-4">
          <p className="text-sm sm:text-base">Yashika</p>
          <p className="text-xs sm:text-sm">yashika@gmail.com</p>
        </div>
      </div>

      {/* Message */}
      <p className="text-sm sm:text-base">
        I don’t tweet anymore. I Roar - with Clan {card.title} behind me.
        <br />
        Privacy is power. Roar wisely.
      </p>

      {/* Card Info */}
      <div>
        <h1 className="text-purple-500 text-2xl sm:text-4xl font-semibold">
          {card.title}
        </h1>
        <p className="text-sm sm:text-lg">{card.description}</p>
      </div>

      {/* Icons (hidden on small) */}
      <div className="hidden lg:flex items-center mt-6 gap-2">
        <Image
          src="/Images/gettingStarted/Object.png"
          width={100}
          height={100}
          className="w-8 h-16 object-contain"
          alt="Object1"
        />
        <Image
          src="/Images/gettingStarted/Clans.png"
          width={100}
          height={100}
          className="w-16 h-12 object-contain"
          alt="Clans"
        />
      </div>
    </div>

    {/* Character Image */}
    <Image
      src={card.image}
      alt="Avatar_1"
      width={450}
      height={300}
      className="absolute bottom-0 right-0 h-[150px] w-[130px] sm:h-[200px] sm:w-[180px] xl:w-1/3 xl:h-[90%]"
    />
  </div>
</div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10">
          {/* <Button onClick={handleContinueClick} width={ 200} /> */}
              {/* <button
               onClick={handleContinueClick}
                className=
                  "group cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 text-white"
                
           
              >
                <div className="relative" >
               
                  <svg
                    width={307}
                    height={80}
                    viewBox="0 0 309 81"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 transition-colors duration-300"
                  >
                    <path
                      d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
                      className="fill-[#0E0E17] group-hover:fill-pink-500 opacity-50"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
                      stroke="white"
                      strokeOpacity="0.24"
                      strokeWidth="2"
                    />
                  </svg>
          
                  
                  <span className="absolute inset-0 flex items-center justify-center text-white z-10">
                 Priya
                  </span>
                </div>
              </button> */}
          
          {/* <Button ButtonText="Continue" onClick={handleRedirect} width={ 200} /> */}
  <button
  onClick={handleContinueClick}
  className="group cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 text-white"
>
  <div
    className="relative w-[160px] h-[45px] sm:w-[200px] sm:h-[55px] md:w-[240px] md:h-[65px] lg:w-[280px] lg:h-[75px] xl:w-[307px] xl:h-[80px]"
  >
    {/* Inline SVG */}
    <svg
      viewBox="0 0 309 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 w-full h-full transition-colors duration-300"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
        className="fill-[#0E0E17] group-hover:fill-pink-500 opacity-50"
        fillOpacity="0.8"
      />
      <path
        d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
        stroke="white"
        strokeOpacity="0.24"
        strokeWidth="2"
      />
    </svg>

    {/* Button text */}
    <span
      className="absolute inset-0 w-full h-full flex items-center justify-center text-white z-10 
                 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium"
    >
    Start Roaring
    </span>
  </div>
          </button>
          <button
onClick={handleRedirect} 
  className="group cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 text-white"
>
  <div
    className="relative w-[160px] h-[45px] sm:w-[200px] sm:h-[55px] md:w-[240px] md:h-[65px] lg:w-[280px] lg:h-[75px] xl:w-[307px] xl:h-[80px]"
  >
    {/* Inline SVG */}
    <svg
      viewBox="0 0 309 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 w-full h-full transition-colors duration-300"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
        className="fill-[#0E0E17] group-hover:fill-pink-500 opacity-50"
        fillOpacity="0.8"
      />
      <path
        d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
        stroke="white"
        strokeOpacity="0.24"
        strokeWidth="2"
      />
    </svg>

    {/* Button text */}
    <span
      className="absolute inset-0 w-full h-full flex items-center justify-center text-white z-10 
                 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium"
    >
     Continue
    </span>
  </div>
</button>



        </div>
      </div>
    </section>
  );
}
