"use client";

import ClanLogo from "./ClanLogo";
import Image from "next/image";
import Button from "./Button";
import { useState, useRef, useEffect } from "react";
import { TwitterAuthProvider } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import gsap from "gsap";
import ClanLogoMobile from "./ClanLogoMobile";
import { useReferral } from "@/context/ReferralContext";

export default function MobileMainPage() {
  const { getAuthUrl, handleReferralCode, isLoading, setIsLoading } = useReferral();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>("/startRoaring");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const iconRef = useRef(null);
  const provider = new TwitterAuthProvider();

  // Check for authentication callback
  useEffect(() => {
    const checkAuthCallback = async () => {
      const userId = searchParams.get('userId');
      if (userId) {
        // Handle the referral code if it exists
        await handleReferralCode(userId);
        
        // Clear the URL parameters
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    };

    checkAuthCallback();
  }, [searchParams, handleReferralCode]);

  const handleMuteUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
      setIsPlaying(false);
      video.play();

      gsap.fromTo(
        iconRef.current,
        { scale: 1 },
        { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.out" }
      );
    }
  };

  const loginWithTwitter = async () => {
    if (typeof window === "undefined") return;

    try {
      setIsLoading(true);
      const authUrl = getAuthUrl();
      
      // Store the current URL to handle the redirect back
      const currentUrl = window.location.href;
      sessionStorage.setItem('redirectUrl', currentUrl);

      window.location.assign(authUrl);
    } catch (error) {
      console.error("Error during Twitter auth:", error);
      setIsLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="w-full h-screen overflow-hidden">
        {/* Mute/Unmute Button */}
        <button
          onClick={handleMuteUnmute}
          className="absolute top-4 left-12 transform -translate-x-1/2  px-4 py-2 rounded-full text-white flex items-center justify-center z-20  hover:bg-white/20 transition duration-300"
        >
          <span className="text-xl p-1" ref={iconRef}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </span>
          {/* {isMuted ? "Unmute" : "Mute"} */}
        </button>

        {/* Video Section */}
        <div className="opacity-60">
          <video
            ref={videoRef}
            preload="auto"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 backdrop-blur-2xl bg-white/30"
            draggable={false}
          >
            <source src="/videos/Main.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Main Content Section */}
        <div className="relative flex flex-col h-screen">
          {/* Centered Logo with more margin and larger size for mobile only */}
          <div className="flex flex-col items-center justify-center mt-18 pb-4 md:hidden">
            <div className="w-64 h-24 xxs:w-72 xxs:h-28 sm:w-80 sm:h-32 flex items-center justify-center">
              <ClanLogoMobile />
            </div>
          </div>

          {/* Avatars and Button Section */}
          <div className="flex justify-between w-full absolute -bottom-[40px] left-0 right-0 h-full pointer-events-none">
            <Image
              src="/Images/gettingStarted/mobileavtar1.png"
              width={500}
              height={550}
              alt="avtar1"
              className="z-1 absolute left-0 bottom-0 xs:-bottom-[40px] w-[220px] xxs:w-[300px] h-[600px] object-contain scale-105"
              draggable={false}
            />
            <Image
              src="/Images/gettingStarted/mobileavtar2.png"
              width={400}
              height={600}
              alt="avtar2"
              className="absolute right-0 -bottom-10 h-[620px] w-[200px] xxs:w-[260px] object-contain scale-110"
              draggable={false}
            />
          </div>

          {/* Start Now Button in semi-transparent box, centered at bottom */}
          <div className="absolute bottom-8 left-0 w-full flex items-center justify-center z-20 pointer-events-auto">
            <Button
              width={250}
              height={60}
              ButtonText="Start Now!"
              className="text-xl text-white font-semibold tracking-wide  px-8 py-4 mx-12 flex items-center justify-center "
              aria-label="Start Now"
              onClick={openModal}
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[308px] p-6 text-center relative">
              <div className="w-full flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  width={100}
                  height={100}
                  className="w-24 h-20 object-contain text-xl"
                  alt="Clans Logo"
                  draggable={false}
                />
              </div>

              <h2 className="text-xl font-bold mb-4 text-black">
                Clans wants to access your X account
              </h2>

              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={loginWithTwitter}
                  className="bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Authenticate"}
                </button>
              </div>

              <p
                onClick={closeModal}
                className="text-lg text-black font-bold cursor-pointer underline mb-4"
              >
                Cancel
              </p>

              <div className="text-left text-gray-600 text-sm border-t pt-4">
                <h3 className="font-semibold mb-2">
                  Things this App can view...
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    All the posts you can view, including posts from protected
                    accounts.
                  </li>
                  <li>
                    Any account you can view, including protected accounts.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
