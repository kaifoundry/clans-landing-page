"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useClan } from "@/context/ClanContext";
import { joinClan } from "@/lib/api";

const SelectClan = () => {
  const clanData = [
    {
      id: "225462e8-0077-45c7-a5f5-4474f2b84166",
      image: "/Images/introducingClans/card_1.png",
      hoverImage: "/Images/selectClan/sideImage2.png",
      cardImage: "/Images/selectClan/cardImg1.png",
      title: "Clan McBuilder",
      description: "We create the future with passion and code.",
      glowColor: "rgba(255, 0, 0, 0.8)",
    },
    {
      id: "b2cb6389-65e4-4d2a-acc1-ce5b02b893a3",
      image: "/Images/introducingClans/card_2.png",
      hoverImage: "/Images/selectClan/sideImage1.png",
      cardImage: "/Images/selectClan/cardImg2.png",
      title: "McHODLer",
      description: "Diamond hands forever.",
      glowColor: "rgba(138, 43, 226, 0.8)",
    },
    {
      id: "98e347d1-b7b9-4c53-ba73-26ff6ac87052",
      image: "/Images/introducingClans/card_3.png",
      hoverImage: "/Images/selectClan/sideImage3.png",
      cardImage: "/Images/selectClan/cardImg3.png",
      title: "Clan McDegen",
      description: "Risk is our middle name.",
      glowColor: "rgba(0, 255, 0, 0.8)",
    },
    {
      id: "9e37533c-164d-475b-8fb0-dc8f67ae7bec",
      image: "/Images/introducingClans/card_4.png",
      hoverImage: "/Images/selectClan/sideImage4.png",
      cardImage: "/Images/selectClan/cardImg4.png",
      title: "Clan McPrivacy",
      description: "Privacy is our birthright.",
      glowColor: "rgba(0, 0, 255, 0.8)",
    },
  ];

  const { selectedCardId, setSelectedCardId } = useClan();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [displayedTitle, setDisplayedTitle] = useState<string>("");
  const [displayedDescription, setDisplayedDescription] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<null | (typeof clanData)[0]>(
    null
  );

  const [clans, setClans] = useState<{ clanId: string; [key: string]: any }[]>(
    []
  );
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState<string | null>(null); // Error management

  useEffect(() => {
    if (clans && clans.length > 0) {
      console.log("🔥 Current Clans State:", clans);
    }
  }, [clans]);

  useEffect(() => {
    if (selectedCardId !== null) {
      const clan = clanData.find((card) => card.id === String(selectedCardId));
      if (clan) {
        setSelectedCard(clan);
        setAvatarImage(clan.hoverImage);
        setDisplayedTitle(clan.title);
        setDisplayedDescription(clan.description);
      }
    }
  }, [selectedCardId]);

  //Important code afterward use
  const getAllClans = async () => {
    console.log("📢 getAllClans() called");

    try {
      setLoading(true); // Start loading
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/clans/fetch/all`
      );
      if (!res.ok) throw new Error("Failed to fetch clans");

      const data = await res.json();
      console.log("🌐 Fetched from API:", data);

      if (data.success && Array.isArray(data.data)) {
        setClans(data.data); // Set fetched data to state
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (err: any) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "Something went wrong while fetching clans");
    } finally {
      setLoading(false); // End loading
      console.log("🏁 getAllClans() completed");
    }
  };

  useEffect(() => {
    getAllClans();
  }, []);

  const handleJoinClan = async (selectedClanId: string) => {
    // const userData = localStorage.getItem("userData");
    // const user = userData ? JSON.parse(userData) : null;

    // const storedUserId = userData?.userId;

    const storedUserId = "0b98014b-7a22-4908-a487-8bfdd7d2d437"; // Dummy User ID for testing

    console.log("📥 Stored User ID:", storedUserId);
    console.log("📥 Selected Clan ID:", selectedClanId);

    if (!storedUserId || !selectedClanId) {
      alert("❌ Missing user or clan ID.");
      return;
    }

    const joinData = {
      userId: storedUserId,
      clanId: selectedClanId,
    };

    console.log("🚀 Sending this data to joinClan API:", joinData);

    try {
      const response = await joinClan(joinData); // Send to API

      console.log("✅ API response:", response);

      if (response?.success) {
        // If API response is successful, show success message
        alert("🎉 Successfully joined the clan!");
        // } else {
        // If API response does not indicate success, show failure
        alert("⚠️ Something went wrong while joining the clan.");
      }
    } catch (error) {
      console.error("❌ Error while calling joinClan API:", error);
      alert("Failed to join clan due to network or server error.");
    }
  };

  if (loading) return <div>Loading clans...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSelectId = (id: string) => {
    setSelectedCardId(id);
    console.log(id);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-black p-0 overflow-hidden">
      <div className="relative w-full max-w-md flex flex-col items-center justify-center gap-6 px-4 pt-8 pb-32 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-2 text-white">Claim your Clan</h1>
        <p className="text-lg md:text-xl text-center mb-6 text-white opacity-80">
          Long ago, clans rose from code and chaos.<br />Now, they return — and they want you.
        </p>

        <div className="flex flex-col items-center mb-4 w-full">
          <div className="flex gap-x-2 items-center justify-center w-full mb-2">
            <div className="h-10 w-1 bg-[#9747FF]"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#B18CFF] ml-2">{displayedTitle}</h2>
          </div>
          <p className="text-lg md:text-xl text-white text-center mt-2">"{displayedDescription}"</p>
        </div>

        <div className="grid grid-cols-2 gap-6 justify-items-center w-full max-w-xs mx-auto mb-8 mt-2">
          {clanData.map((clan, index) => (
            <div
              key={clan.id}
              onClick={() => {
                setActiveIndex(index);
                setAvatarImage(clan.hoverImage);
                setSelectedCard(clan);
                setDisplayedTitle(clan.title);
                setDisplayedDescription(clan.description);
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setAvatarImage(clan.hoverImage);
                setDisplayedTitle(clan.title);
                setDisplayedDescription(clan.description);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                if (activeIndex !== null) {
                  const active = clanData[activeIndex];
                  setAvatarImage(active.hoverImage);
                  setDisplayedTitle(active.title);
                  setDisplayedDescription(active.description);
                }
              }}
              className={clsx(
                "relative h-[130px] w-[70px] cursor-pointer transition-transform duration-300",
                activeIndex === index ? "scale-110 z-10" : "scale-100 z-0"
              )}
              style={{
                filter:
                  activeIndex === index || hoveredIndex === index
                    ? `drop-shadow(0 0 8px ${clan.glowColor}) drop-shadow(0 0 16px ${clan.glowColor})`
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
                      ? `0 0 8px ${clan.glowColor}, 0 0 20px ${clan.glowColor}`
                      : "none",
                  backgroundColor:
                    activeIndex === index || hoveredIndex === index
                      ? clan.glowColor
                      : "white",
                }}
              ></div>

              <div
                className="absolute inset-[4px] text-white bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
                style={{
                  clipPath:
                    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                  backgroundImage: `url(${clan.image})`,
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
                  {clan.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center w-full mt-8 mb-2 z-10">
          {selectedCard && (
            <Link
              key={selectedCard.id}
              href={`/CardPage`}
              onClick={() => handleSelectId(selectedCard.id)}
            >
              <button
                className="group cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 text-white"
                onClick={() => handleJoinClan(selectedCard.id)}
              >
                <div className="relative w-[200px] h-[55px] sm:w-[240px] sm:h-[65px] md:w-[280px] md:h-[75px] lg:w-[307px] lg:h-[80px]">
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
                  <span
                    className="absolute inset-0 w-full h-full flex items-center justify-center text-white z-10 text-lg md:text-xl font-semibold"
                  >
                    Join Clan
                  </span>
                </div>
              </button>
            </Link>
          )}
        </div>
      </div>

      {avatarImage && (
        <Image
          src={avatarImage}
          height={400}
          width={300}
          alt="bgAvatar"
          className="absolute bottom-0 right-0 z-0 pointer-events-none"
          style={{ objectFit: "contain" }}
        />
      )}
    </section>
  );
};

export default SelectClan;
