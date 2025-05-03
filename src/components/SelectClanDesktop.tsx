"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useClan } from "@/context/ClanContext";
import { debounce } from "lodash";
import { gsap } from "gsap";
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

  //Dynamic Button Code
  const buttonSizeBreakpoints = [
    { breakpoint: 1536, size: { width: 280, height: 55 } },
    { breakpoint: 1280, size: { width: 300, height: 50 } },
    { breakpoint: 1024, size: { width: 220, height: 45 } },
    { breakpoint: 768, size: { width: 100, height: 40 } },
    { breakpoint: 640, size: { width: 180, height: 35 } },
    { breakpoint: 0, size: { width: 150, height: 30 } },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [displayedTitle, setDisplayedTitle] = useState<string>("");
  const [displayedDescription, setDisplayedDescription] = useState<string>("");

  const { selectedCardId, setSelectedCardId } = useClan();

  const [selectedCard, setSelectedCard] = useState<null | (typeof clanData)[0]>(
    null
  );

  // State to manage clans data, loading state, and errors using API
  const [clans, setClans] = useState<{ clanId: string; [key: string]: any }[]>(
    []
  ); // To store all clans
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState<string | null>(null); // Error management

  // const [userData, setUserdata] = useState<null | any>(null); // To store user data

  const [buttonSize, setButtonSize] = useState({ width: 150, height: 30 });
  // ✅ Fetch clans on component mount

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData");
  //   if (storedUserData) {
  //     const parseUserdata = JSON.parse(storedUserData);
  //     setUserdata(parseUserdata);
  //     console.log("User data from localStorage:", parseUserdata);
  //   }
  // }, []); // Empty dependency array to run this effect only once when the component mounts.

  useEffect(() => {
    if (clans && clans.length > 0) {
      console.log("🔥 Current Clans State:", clans);
    }
  }, [clans]);

  useEffect(() => {
    calculateButtonSize();
    const debouncedCalculateSize = debounce(calculateButtonSize, 100);
    window.addEventListener("resize", debouncedCalculateSize);
    return () => {
      debouncedCalculateSize.cancel();
      window.removeEventListener("resize", debouncedCalculateSize);
    };
  }, []);

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

  // ✅ Fetch clans & cache in localStorage
  // const getAllClans = async () => {
  //   console.log("📢 getAllClans() called");

  //   try {
  //     // 🔍 Check localStorage for cached data
  //     const stored = localStorage.getItem("clanData");
  //     if (stored) {
  //       const parsed = JSON.parse(stored);
  //       console.log("📦 localStorage fetched:", parsed);

  //       if (parsed.success && Array.isArray(parsed.data)) {
  //         console.log("✅ Using cached clan data:", parsed);
  //         setClans(parsed.data); // ✅ Corrected line
  //         return parsed.data;
  //       } else {
  //         console.warn("⚠️ Cached data format invalid, fetching from API...");
  //       }
  //     }

  //     // 🌐 Fetch from API if no cache or invalid data
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/clans/fetch/all`
  //     );
  //     if (!res.ok) throw new Error("Failed to fetch clans");

  //     const data = await res.json();
  //     console.log("🌐 Fetched from API:", data);

  //     if (data.success && Array.isArray(data.data)) {
  //       localStorage.setItem("clanData", JSON.stringify(data));
  //       setClans(data.data); // ✅ Store array only
  //       return data.data;
  //     } else {
  //       throw new Error("Invalid API response structure");
  //     }
  //   } catch (err: any) {
  //     console.error("❌ Fetch error:", err);
  //     setError(err.message || "Something went wrong while fetching clans");
  //   } finally {
  //     setLoading(false);
  //     console.log("🏁 getAllClans() completed");
  //   }
  // };

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
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;

    const storedUserId = user?.userId;

    // const storedUserId = "0b98014b-7a22-4908-a487-8bfdd7d2d437"; // Testing User ID for testing

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
                // Add glow effect animation on hover
                gsap.to(`#card-${clan.id}`, {
                  scale: 1.05,
                  duration: 0.3,
                });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                if (activeIndex !== null) {
                  const active = clanData[activeIndex];
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
                  "absolute xl:bottom-[-100px] lg:bottom-[-80px] md:bottom-[-60px] left-0 w-full flex justify-center transition-opacity duration-300 ",
                  activeIndex === index ? "opacity-100" : "opacity-0"
                )}
              >
                <Link
                  key={clan.id}
                  href={`/CardPage`}
                  onClick={() => handleSelectId(clan.id)}
                >
                  <Button
                    onClick={() => handleJoinClan(clan.id)} // Pass the first clanId
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
