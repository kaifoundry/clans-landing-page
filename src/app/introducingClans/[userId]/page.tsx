"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Card from "@/components/Card";
import { useClan } from "@/context/ClanContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import ClanLogo from "@/components/ClanLogo";
import { clansData } from "@/data/clansData";
import { useUser } from "@/context/UserContext";
import { useReferral } from "@/context/ReferralContext";
const IntroducingClans = () => {
  const { clans, loading, error, setSelectedCardId } = useClan();
    const { getAuthUrl, handleReferralCode,isLoading, setIsLoading } = useReferral();
    const searchParams = useSearchParams();
  console.log("clans", clans);
  const router = useRouter();
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // Initialize userId as null
 const { userData, fetchUserData,  } = useUser();
  // Get route parameters
  const params = useParams();
 console.log("params", params);
  // Memoize the userId update function
  const updateUserId = useCallback(() => {
    const userIdFromParams = params?.userId;
    if (userIdFromParams) {
      const id = Array.isArray(userIdFromParams)
        ? userIdFromParams[0]
        : userIdFromParams;
      setUserId((currentUserId) => (currentUserId !== id ? id : currentUserId));
    }
  }, [params?.userId]);

  // Effect to extract and set the userId from route parameters
  useEffect(() => {
    updateUserId();
  }, [updateUserId]);


  useEffect(() => {
    const checkAuthCallback = async () => {
      const userId = searchParams.get("userId");

      // Check if referral code exists in cookies
      const cookies = document.cookie
        .split(";")
        .reduce((acc: Record<string, string>, cookie) => {
          const [key, value] = cookie.split("=").map((c) => c.trim());
          acc[key] = decodeURIComponent(value);
          return acc;
        }, {});

      const referralCode = cookies["referralCode"];

      if (userId) {
        if (referralCode) {
          // If both userId from URL and referralCode from cookie exist, use referralCode
          await handleReferralCode(referralCode);
        } else {
          await handleReferralCode(userId);
        }

        // Clean the URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    };

    checkAuthCallback();
  }, [searchParams, handleReferralCode]);

  const handleUserDataFetch = useCallback(() => {
    if (userId) {
      console.log("User ID from params:", userId);
      localStorage.setItem("userId", userId);
      fetchUserData(userId);
    }
  }, [userId, fetchUserData]);

  useEffect(() => {
    handleUserDataFetch();
  }, [handleUserDataFetch]);

  const cardData = Array.isArray(clans)
    ? clans.map((clan, index) => ({
        id: clan.clanId,
        title: clan.title,
        description: clan.description,
        ...clansData[index],
      }))
    : [];


    useEffect(() => {
      cardRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref, cardData[index].from, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.2,
          });

          // Hover animation
          const onEnter = () => {
            gsap.to(ref, {
              scale: 1.05,
              duration: 0.3,
              ease: "power1.out",
            });
          };
          const onLeave = () => {
            gsap.to(ref, {
              scale: 1,
              duration: 0.3,
              ease: "power1.out",
            });
          };

          ref.addEventListener("mouseenter", onEnter);
          ref.addEventListener("mouseleave", onLeave);

          return () => {
            ref.removeEventListener("mouseenter", onEnter);
            ref.removeEventListener("mouseleave", onLeave);
          };
        }
      });
    }, []);

  if (!userId || loading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
        <div className="text-white text-3xl">Loading clans...</div>
      </div>
    );

  if (error)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );




  return (
    <section className="relative main-section flex flex-col items-center gap-2 px-8 py-8 overflow-hidden">
      <span className="hidden lg:block    absolute top-10 left-10 w-16 h-14 sm:w-28 sm:h-10 md:w-36 md:h-12 lg:w-44 lg:h-14 xl:w-52 xl:h-16 2xl:w-60 2xl:h-20 z-10">
        <ClanLogo />
      </span>
      {/* <h1 className="text-[28px] md:text-4xl lg:text-5xl font-bold"> */}
      <h1 className="text-3xl font-semibold lg:text-4xl xl:text-5xl md:text-4xl text-center text-white font-bold mt-10">
        Introducing Clans
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 xxs:gap-x-8 gap-x-16 gap-y-4 p-8">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            onClick={() => {
              setSelectedCardId(card.id.toString());
              router.push("/selectClan");
            }}
            className="cursor-pointer"
            draggable={false}
          >
            <Card
              image={card.image}
              title={card.title}
              description={card.description}
              hoverImage={card.hoverImage}
              glowColor={card.glowColor}
            />
          </div>
        ))}
      </div>

      <p className="hidden md:block text-xl font-semibold">
        Choose your <span className="text-pink-600 ">"CLAN"</span>
      </p>
    </section>
  );
};

export default IntroducingClans;
