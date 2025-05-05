import Image from "next/image";
import Button from "@/components/Button";
import ClanLogo from "@/components/ClanLogo";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import toast from 'react-hot-toast';

interface Props {
  userId: string;
}

interface UserData {
  userId: string;
}

const StartRoaringPage: React.FC<Props> = ({ userId }) => {
  const avatarLeftRef = useRef(null);

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (userId) {
      console.log("Mobile User ID from params:", userId);
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  useEffect(() => {
    const getUserData = async () => {
      if (userId) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/fetch/${userId}`
          );
          if (!res.ok) {
            throw new Error("Error fetching user data");
          }
          const data = await res.json();

          //storing the user data in local storage
          if (data.success && data) {
            localStorage.setItem("userData", JSON.stringify(data.data));
            //check if it is in local storage
            const userData = localStorage.getItem("userData");
            if (userData) {
              console.log("User data in local storage:", JSON.parse(userData));
            }
            setUserData(data.data); // Set the user data in state
            console.log("Fetched user data:", data.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data. Please try again.");
        }
      }
    };

    getUserData(); // Call the function to fetch user data when userId is available
  }, [userId]);

  // GSAP animation effect for the left avatar
  useEffect(() => {
    // Ensure the ref is attached before animating
    if (avatarLeftRef.current) {
      gsap.fromTo(
        avatarLeftRef.current,
        { x: "-200", opacity: 0 }, // Start position (off-screen left, invisible)
        {
          x: 0, // End position (original position)
          opacity: 1, // End opacity (fully visible)
          duration: 1.5,
          ease: "power3.out",
        }
      );
    }
    // Empty dependency array ensures this runs only once after initial mount
  }, []);

  // Show loading state until the userId has been processed and set
  if (!userId) {
    // Replace with a more sophisticated loading component if desired
    return <div>Loading...</div>;
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
        draggable={false}
      />
      <Image
        src="/Images/startRoaring/Avtar3.png"
        alt="Avatar 2"
        width={300}
        height={300}
        objectFit="cover"
        className="absolute right-0 bottom-0 w-[220px] h-[90%] z-0 select-none pointer-events-none"
        draggable={false}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full  mx-auto px-2 min-h-screen">
        {/* Header */}
        <h1 className="text-3xl text-center font-bold text-white leading-tight mt-10 mb-8 drop-shadow-lg">
          Introducing
          <br />
          Roar Points
        </h1>

        {/* Center Card - vertically centered */}
        <div className="flex-1 flex flex-col justify-center w-full ">
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
};

export default StartRoaringPage;
