"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clansData } from "@/data/selectClanData";
import Loader from "./Features/Loader";
import { useClan } from "@/context/ClanContext";

const SelectClan = () => {
  const router = useRouter();
  const { clans, loading, error, selectedCardId, setSelectedCardId, joinClan } = useClan();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    image: string;
    hoverImage: string;
    cardImage: string;
    title: string;
    description: string;
    glowColor: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingClanId, setPendingClanId] = useState<string | null>(null);

  const cardData = useMemo(() => {
    return Array.isArray(clans) ? clans.map((clan, index) => {
      const clanData = clansData[index] || {};
      return {
        id: clan.clanId,
        title: clan.title,
        description: clan.description,
        image: clanData.image || "",
        hoverImage: clanData.hoverImage || "",
        cardImage: clanData.image || "",
        glowColor: clanData.glowColor || ""
      };
    }) : [];
  }, [clans]);

  useEffect(() => {
    if (clans && clans.length > 0) {
      console.log("🔥 Current Clans State:", clans);
    }
  }, [clans]);

  useEffect(() => {
    if (selectedCardId !== null) {
      const clan = cardData.find((card) => card.id === String(selectedCardId));
      if (clan) {
        setSelectedCard(clan);
        setAvatarImage(clan.hoverImage);
        setDisplayedTitle(clan.title);
        setDisplayedDescription(clan.description);
      }
    }
  }, [selectedCardId, cardData]);

  const handleSelectId = (id: string): void => {
    setSelectedCardId(id);
    console.log(id);
  };

  const handleJoinClan = (clanId: string) => {
    setPendingClanId(clanId);
    const clan = cardData.find((card) => card.id === clanId);
    if (clan) {
      setSelectedCard(clan);
    }
    setModalOpen(true);
  };

  const handleConfirmJoin = async () => {
    setModalOpen(false);

    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;
    const storedUserId = user?.userId;

    console.log("Stored User ID from the Local Storage:", storedUserId);
    console.log("Selected Clan ID:", pendingClanId);

    if (!storedUserId || !pendingClanId) {
      toast.error("Missing user or clan ID.");
      return;
    }

    const joinData = {
      userId: storedUserId,
      clanId: pendingClanId,
    };

    console.log("sending this data to joinClan API:", joinData);

    try {
      const success = await joinClan(joinData);
      if (success) {
        toast.success("Successfully joined the clan!");
        setSelectedCardId(pendingClanId);
        router.push("/CardPage");
      } else {
        toast.error("Failed to join clan. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error while calling joinClan API: ", error);
      toast.error("Failed to join clan due to network or server error.");
    }
  };

  if (loading) return <div>Loading clans...</div>;
  if (error) return <div>Error: {error}</div>;

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
            "{displayedDescription}"
          </p>
        </div>

        <div className="flex gap-12 items-center w-3/4 mx-0 lg:flex-col-4 md:flex-col-2 z-1">
          {cardData.map((clan, index) => (
            <div
              key={clan.id}
              onClick={() => {
                if (activeIndex !== index) {
                  setActiveIndex(index);
                  setAvatarImage(clan.hoverImage);
                  setSelectedCard(clan);
                  setDisplayedTitle(clan.title);
                  setDisplayedDescription(clan.description);
                }
              }}
              onMouseEnter={() => {
                if (hoveredIndex !== index) {
                  setHoveredIndex(index);
                  setAvatarImage(clan.hoverImage);
                  setDisplayedTitle(clan.title);
                  setDisplayedDescription(clan.description);
                  // Add glow effect animation on hover
                  gsap.to(`#card-${clan.id}`, {
                    scale: 1.05,
                    duration: 0.3,
                  });
                }
              }}
              onMouseLeave={() => {
                if (hoveredIndex !== null) {
                  setHoveredIndex(null);
                  if (activeIndex !== null) {
                    const active = cardData[activeIndex];
                    setAvatarImage(active.hoverImage);
                    setDisplayedTitle(active.title);
                    setDisplayedDescription(active.description);
                  }
                  // Reset glow effect animation
                  gsap.to(`#card-${clan.id}`, {
                    scale: 1,
                    boxShadow: "none",
                    duration: 0.3,
                  });
                }
              }}
              className={clsx(
                "relative group cursor-pointer transition-all duration-500",
                "xl:h-[400px] xl:w-[220px] md:h-[200px] md:w-[100px] h-[280px] w-[158px] lg:w-[150px] lg:h-[300px]",
                activeIndex === index ? "scale-105" : "scale-100"
              )}
              id={`card-${clan.id}`}
            >
              <div
                className="absolute inset-0 rounded-xl transition-all duration-500"
                style={{
                  clipPath:
                    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
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
                  className="lg:text-xl md:text-[12px] font-bold text-center px-2 absolute bottom-10"
                  style={{
                    textShadow:
                      "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8)",
                  }}
                >
                  {clan.title}
                </h3>
              </div>

              <div
                className={clsx(
                  "absolute xl:bottom-[-100px] lg:bottom-[-80px] md:bottom-[-60px] left-0 w-full flex justify-center transition-opacity duration-300  ",
                  activeIndex === index ? "opacity-100" : "opacity-0"
                )}
              >
                <button
                  onClick={() => handleJoinClan(clan.id)}
                  className="group relative z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95 w-full  min-h-[40px] xl:w-[220px] xl:h-[60px] lg:w-[150px] lg:h-[30px] md:w-[100px] md:h-[20px]"
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 309 81"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
                      className="fill-black group-hover:fill-purple-800/40 opacity-80 transition-colors duration-300"
                    />
                    <path
                      d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
                      stroke="white"
                      strokeOpacity="0.4"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <span className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide z-10 text-base sm:text-lg lg:text-sm md:text-xs xl:text-xl">
                    Join Clan
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {avatarImage && (
          <div className="absolute bottom-0 ease-in-out right-0 z-0">
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

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur effect */}
          <div
            className="absolute inset-0 bg-black/50  bg-opacity-50 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal Content */}
          <div
            className={`relative bg-black  border border- text-white p-6 rounded-lg w-full max-w-md mx-4 z-10`}
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              Clan Confirmation
            </h3>

            <div className="mb-6 text-center">
              <p className="mb-4">Are you confirm you want to choose</p>
              <p className="text-xl font-bold text-purple-400">
                {selectedCard?.title}
              </p>
              <p className="mt-2 italic">"{selectedCard?.description}"</p>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                ButtonText="No, go back"
                onClick={() => setModalOpen(false)}
                width={130}
                height={40}
                className="bg-gray-700 hover:bg-gray-600"
              />
              <Button
                ButtonText="Yes"
                onClick={handleConfirmJoin}
                width={130}
                height={40}
              />
            </div>
          </div>
        </div>
      )}

      {loading && <Loader message="Loading Clans Please wait..." />}
    </section>
  );
};

export default SelectClan;
