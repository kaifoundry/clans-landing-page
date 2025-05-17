"use client";

import Image from "next/image";
import Button from "@/components/Button"; // Assuming Button component exists at this path
import ClanLogo from "@/components/ClanLogo"; // Assuming ClanLogo component exists at this path
import Link from "next/link";
import { gsap } from "gsap";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import Loader from "./Features/Loader";
import { useUser } from "@/context/UserContext";
import { useReferral } from "@/context/ReferralContext";
import { useSearchParams } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { RefObject } from "react";

interface Props {
  // userId: string;
}


interface CommonRoaringProps {
  isModalOpen: boolean;
  isLoading: boolean;
  openModal: () => void;
  closeModal: () => void;
  callTwitterAuthAPI: () => void;
  avatarLeftRef: RefObject<HTMLImageElement | null>;
  avatarRightRef?: RefObject<HTMLImageElement | null>; 
}
interface UserData {
  userId: string;
}

// Debounce function to limit how often a function can be called
// const debounce = (func: Function, wait: number) => {
//   let timeout: NodeJS.Timeout;
//   return function executedFunction(...args: any[]) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

const StartRoaringPage = React.memo(({
  isModalOpen,
  isLoading,
  openModal,
  closeModal,
  callTwitterAuthAPI,
  avatarLeftRef,
}: CommonRoaringProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const { userData, fetchUserData,  } = useUser();
 // const avatarLeftRef = useRef(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
 // const { getAuthUrl, handleReferralCode,isLoading, setIsLoading } = useReferral();
  const searchParams = useSearchParams();
 // const [isModalOpen, setIsModalOpen] = useState(false);
 //console.log("search params", searchParams);
 

  // const callTwitterAuthAPI = async () => {
  //   try {
  //     setIsLoading(true);
  //     const authUrl = getAuthUrl();
  //     const currentUrl = window.location.href;
  //     sessionStorage.setItem("redirectUrl", currentUrl);
  //     window.location.assign(authUrl);
  //   } catch (error) {
  //     console.error("Error during Twitter auth:", error);
  //     setIsLoading(false);
  //   }
  // };

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  // Memoize the resize handler with debounce
  // const handleResize = useCallback(
  //   debounce(() => {
  //     setIsMobile(window.innerWidth <= 768);
  //   }, 100),
  //   []
  // );

  // useEffect(() => {
  //   handleResize(); // Initial check
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [handleResize]);

  // Memoize the user data fetch callback
  // const handleUserDataFetch = useCallback(() => {
  //   if (userId) {
  //     console.log("User ID from params:", userId);
  //     localStorage.setItem("userId", userId);
  //     fetchUserData(userId);
  //   }
  // }, [userId, fetchUserData]);

  // useEffect(() => {
  //   handleUserDataFetch();
  // }, [handleUserDataFetch]);

  // GSAP animation effect for the left avatar - only run once
  // useEffect(() => {
  //   if (avatarLeftRef.current && !animationRef.current) {
  //     animationRef.current = gsap.fromTo(
  //       avatarLeftRef.current,
  //       { x: "-200", opacity: 0 },
  //       {
  //         x: 0,
  //         opacity: 1,
  //         duration: 1.5,
  //         ease: "power3.out",
  //       }
  //     );
  //   }

  //   return () => {
  //     if (animationRef.current) {
  //       animationRef.current.kill();
  //       animationRef.current = null;
  //     }
  //   };
  // }, []);

  // Memoize the main content
  // if (!userId || isLoading) {
  //   return <Loader message={"Loading please wait..."} />;
  // }

    return (
      <section className="w-full flex flex-col gap-y-8 items-center justify-center px-6 py-12 h-screen bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center relative overflow-hidden ">
        {/* Clan Logo */}
        <span className="absolute top-10 left-10 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 transition-all duration-300 ease-in-out">
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
          <h2 className="text-xl lg:text-4xl xl:text-5xl md:text-4xl text-center text-white font-bold mt-20">
            Introducing Roar Points
          </h2>
        </div>
        {/* Center Card Section */}
        <div className="z-10 flex items-center justify-center flex-col gap-6 w-full max-w-4xl px-4 md:px-0">
          <div
            className="w-full   lg:w-[958px] lg:h-[530px] px-10 py-8 rounded relative flex flex-col justify-center items-center lg:gap-12 md:gap-5"
            style={{
              backgroundImage: "url('/Images/startRoaring/centerbg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Text Content */}
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center text-lg md:text-xl leading-8 md:leading-10 text-white">
                Ancient warriors had clans.
                <br /> You have social media. <br />
                <span className="font-bold">
                  Post. Engage. Earn Roar Points.
                </span>
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
              className="absolute bottom-2 rounded-r-4xl right-5 w-[120px] h-auto md:w-[300px] lg:w-[280px] 2xl:w-[350px] max-w-full" // Responsive sizing
              priority // Prioritize loading if it's visible early
              draggable={false}
            />
          </div>

          {/* Navigation Button */}
          <div className="w-full lg:w-[958px] flex justify-center lg:justify-end mt-6 md:mt-0">
            {/* <Link href="/introducingClans" prefetch> */}
            <Button
              onClick={openModal}
              ButtonText="Start Roaring"
              width={307}
              height={79}
              className="mr-4"
            />
            {/* </Link> */}
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

        {/* Modal with animation */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg w-[308px] p-6 text-center relative"
              >
                <div className="w-full flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    width={100}
                    height={100}
                    className="w-24 h-20 object-contain text-xl"
                    alt="Logo"
                    draggable={false}
                    priority
                  />
                </div>

                <h2 className="text-xl font-bold mb-4 text-black">
                  Clans wants to access your X account
                </h2>

                <div className="flex flex-col gap-3 mb-4">
                  <button
                    onClick={callTwitterAuthAPI}
                    className="bg-black text-white py-3 rounded-full text-base font-bold hover:bg-gray-800 transition duration-300 cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="pr-1">Authenticating</span>
                        <LuLoaderCircle className="animate-spin" />
                      </span>
                    ) : (
                      "Authenticate"
                    )}
                  </button>
                </div>

                {/* <p
                        onClick={closeModal}
                        className="text-base text-[#141414]  font-bold cursor-pointer mb-4"
                      >
                        Cancel
                      </p> */}

                <p
                  onClick={closeModal}
                  className="text-base text-red-500 font-bold cursor-pointer mb-4"
                >
                  Cancel
                </p>

                <div className="text-left border-t border-[#EBEBEB] pt-4">
                  <h3 className="font-bold mb-2 text-sm text-[#141414]">
                    {/* Things this App can view... */}
                    Permission Required
                  </h3>
                  <ul className="list-disc list-outside pl-5 space-y-1 leading-relaxed">
                    <li className="font-[500] text-sm text-[#525252]">
                      All the posts you can view, including posts from protected
                      accounts.
                    </li>
                    <li className="font-[500] text-sm text-[#525252]">
                      Any account you can view, including protected accounts.
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }, );


StartRoaringPage.displayName = "StartRoaringPage";

export default StartRoaringPage;

