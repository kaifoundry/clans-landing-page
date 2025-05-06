import Image from "next/image";
import Button from "@/components/Button";
import ClanLogo from "@/components/ClanLogo";
import Link from "next/link";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserContext';
import Loader from "./Features/Loader";

interface Props {
  userId: string;
}

interface UserData {
  userId: string;
}

const StartRoaringPage: React.FC<Props> = React.memo(({ userId }) => {
  const avatarLeftRef = useRef(null);
  const { userData, fetchUserData, isLoading } = useUser();

  // Memoize the fetchUserData callback
  const handleUserDataFetch = useCallback(() => {
    if (userId) {
      console.log("Mobile User ID from params:", userId);
      localStorage.setItem("userId", userId);
      fetchUserData(userId);
    }
  }, [userId, fetchUserData]);

  useEffect(() => {
    handleUserDataFetch();
  }, [handleUserDataFetch]);

  // GSAP animation effect for the left avatar - only run once
  useEffect(() => {
    if (avatarLeftRef.current) {
      gsap.fromTo(
        avatarLeftRef.current,
        { x: "-200", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    }
  }, []);

  // Memoize the main content
  const mainContent = useMemo(() => {
    if (!userId || isLoading) {
      return <Loader message="Loading please wait..." />;
    }

    return (
      <section className="relative w-screen h-screen overflow-hidden bg-black flex flex-col justify-between bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center ">
        {/* Background Avatars */}
        <Image
          ref={avatarLeftRef}
          src="/Images/startRoaring/MobileAvtar1.png"
          alt="Avatar 1"
          width={400}
          height={400}
          objectFit="cover"
          className="absolute left-0 bottom-0 w-[260px] h-[90%] z-0 select-none pointer-events-none"
        />
        <Image
          src="/Images/startRoaring/Avtar3.png"
          alt="Avatar 2"
          width={300}
          height={300}
          objectFit="cover"
          className="absolute right-0 bottom-0 w-[220px] h-[90%] z-0 select-none pointer-events-none"
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center w-full mx-auto px-2 min-h-screen">
          {/* Header */}
          <h1 className="text-3xl text-center font-bold text-white leading-tight mt-10 mb-8 drop-shadow-lg">
            Introducing
            <br />
            Roar Points
          </h1>

          {/* Center Card - vertically centered */}
          <div className="flex-1 flex flex-col justify-center w-full">
            <div
              className="px-6 py-10 rounded relative bg-black/80 border border-gray-400 w-full max-w-[370px] flex flex-col gap-4 drop-shadow-xl flex-shrink-0 mx-auto"
              style={{
                overflow: "hidden",
                clipPath:
                  "polygon(2% 8%, 2% 85%, 10% 98%, 96% 98%, 98% 95%, 98% 18%, 90% 3%, 4% 3%, 2% 8%)",
                boxShadow: "0 0 32px 0 rgba(0,0,0,0.9)",
                backdropFilter: "blur(2px)",
              }}
            >
              <p className="text-center text-lg text-white mb-2">
                Ancient warriors had clans.
                <br />
                You have social media.
              </p>
              <p className="text-center text-lg text-white font-bold mb-2">
                Post. Engage. Earn Roar Points.
              </p>
              <p className="text-center text-lg text-white mb-2">
                Only those who join the waitlist
                <br />
                will enter the battleground.
              </p>
              <p className="text-center text-lg text-white">
                Which clan will you join?
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="w-full flex justify-center mb-8">
            <Link href="/introducingClans" prefetch>
              <Button
                width={260}
                height={60}
                ButtonText="Start Roaring"
                className="font-semibold w-full max-w-[260px] drop-shadow-lg text-lg"
              />
            </Link>
          </div>
        </div>
      </section>
    );
  }, [userId, isLoading]);

  return mainContent;
});

StartRoaringPage.displayName = 'StartRoaringPage';

export default StartRoaringPage;
