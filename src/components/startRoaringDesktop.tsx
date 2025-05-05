"use client";

import Image from "next/image";
import Button from "@/components/Button"; // Assuming Button component exists at this path
import ClanLogo from "@/components/ClanLogo"; // Assuming ClanLogo component exists at this path
import Link from "next/link";
import { gsap } from "gsap";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Loader from "./Features/Loader";

interface Props {
  userId: string;
}

interface UserData {
  userId: string;
}

const StartRoaringPage: React.FC<Props> = ({ userId }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null); // State to hold user data
  const avatarLeftRef = useRef(null); // Ref for the animation
  const [isLoading, setIsLoading] = useState(true); // <-- for intentional delay

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 2 seconds
    }, 500);
    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // ✅ Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Optional: Log the userId once it's set (for debugging)
  useEffect(() => {
    if (userId) {
      console.log("User ID from params:", userId);
      localStorage.setItem("userId", userId); // Store userId in local storage
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
            const { isActiveUser } = data.data;
            console.log("User active status", isActiveUser);
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
  if (!userId || isLoading) {
    // Replace with a more sophisticated loading component if desired
    return <Loader message={"Loading please wait..."} />;
  }

  // Render the main page content once userId is available
  return (
    <section className="w-full flex flex-col gap-y-8 items-center justify-center px-6 py-12 h-screen bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center relative overflow-hidden ">
      {/* Clan Logo */}
      <span className="absolute top-3 left-3 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 transition-all duration-300 ease-in-out">
        <ClanLogo />
      </span>
      {/* Display the userId (e.g., for debugging or personalization) */}
      {/* You might remove this h1 in the final version */}
      {/* <h1 className="text-white text-sm absolute top-5 right-5">
        User: {userId}
      </h1> */}

      {/* Page Title */}
      <div className=" z-10">
        {" "}
        {/* Ensure title is above potential overlaps */}
        <h2 className="text-xl lg:text-4xl xl:text-5xl md:text-4xl text-center text-white font-semibold mt-20">
          Introducing Roar Points
        </h2>
      </div>
      {/* Center Card Section */}
      <div className="z-10 drop-shadow-[10px_10px_5px_rgba(255,255,255,1)] flex items-center justify-center flex-col gap-6 w-full max-w-4xl px-4 md:px-0">
        <div
          className="w-full md:w-[450px] md:h-[400px] lg:w-[958px] lg:h-[500px] px-10 py-8 rounded relative bg-gradient-to-br from-black via-black/98 to-black/80 flex flex-col justify-center items-center lg:gap-12 md:gap-5"
          style={{
            overflow: "hidden",
            // Custom shape using clip-path
            clipPath:
              "polygon(2% 8%, 2% 85%, 10% 98%, 96% 98%, 98% 95%, 98% 18%, 90% 3%, 4% 3%, 2% 8%)",
          }}
        >
          {/* Text Content */}
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-center text-lg md:text-xl leading-8 md:leading-10 text-white">
              Ancient warriors had clans.
              <br /> You have social media. <br />
              <span className="font-bold">Post. Engage. Earn Roar Points.</span>
              <br /> Only those who join the waitlist
              <br /> will enter the battleground. <br />
              Which clan will you join?
            </p>
          </div>

          {/* Right Avatar Image (decorative) */}
          <Image
            src="/Images/startRoaring/Avtar1.png"
            alt="Stylized avatar character 1"
            width={200} // Base width, adjust className for responsiveness
            height={200} // Base height, adjust className for responsiveness
            className="absolute bottom-0 right-0 w-[120px] h-auto md:w-[150px] lg:w-[280px] 2xl:w-[350px] max-w-full" // Responsive sizing
            priority // Prioritize loading if it's visible early
            draggable={false}
          />
        </div>

        {/* Navigation Button */}
        <div className="w-full flex justify-center lg:justify-end mt-6 md:mt-0 ">
          <Link href="/introducingClans" prefetch>
            <Button ButtonText="Start Roaring" width={300} height={80} />{" "}
            {/* Ensure Button component renders a clickable element */}
          </Link>
        </div>
      </div>
      {/* Left Avatar Image (animated) */}
      <Image
        ref={avatarLeftRef} // Attach ref for GSAP animation
        src="/Images/startRoaring/Avtar2.png"
        height={500} // Base height
        width={500} // Base width
        alt="Stylized avatar character 2"
        className="absolute bottom-0 left-0 z-0 md:z-10 w-[250px] h-auto md:w-[300px] lg:w-[400px] xl:w-[500px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:left-20 xl:left-10 md:left-0 max-w-full" // Responsive sizing and positioning
        priority // Prioritize loading if it's important LCP
        draggable={false}
      />
    </section>
  );
};

export default StartRoaringPage;
