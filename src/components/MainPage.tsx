"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { getTwitterAuth } from "@/lib/api";
import { set } from "lodash";
const provider = new TwitterAuthProvider();

const MainPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const iconRef = useRef(null);
  const avatarLeftRef = useRef(null);
  const avatarRightRef = useRef(null);
  const router = useRouter();

  // Dummy decrypt function (replace with real decryption if needed)
  // const decryptData = (encrypted: string) => {
  //   const decryptedString = atob(encrypted); // base64 decode
  //   return JSON.parse(decryptedString);
  // };

  const callTwitterAuthAPI = () => {
    if (typeof window === "undefined") return; // Ensure this is running on the client

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_API_BASE_URL");
      return;
    }

    // Use location.assign to ensure full redirect (especially helpful on mobile)
    window.location.assign(`${baseUrl}/api/auth/twitter`);
  };

  // const callTwitterAuthAPI = async () => {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/twitter`
  //   );
  //   const data = await res.json();
  //   if (data?.url) {
  //     window.location.href = data.url;
  //   }
  // };

  // const handleTwitterLogin = async () => {
  //   try {
  //     const response = await getTwitterAuth();
  //     if (response.url) {
  //       window.location.href = response.url;
  //     } else {
  //       console.error("Failed to get Twitter authorization URL");
  //     }
  //   } catch (error) {
  //     console.error("Twitter authentication error:", error);
  //   }
  // };

  // const handleTwitterCallback = async () => {
  //   try {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const data = urlParams.get("data");
  //     const isEncrypted = urlParams.get("encrypted") === "true";
  //     const errorMessage = urlParams.get("message");

  //     if (errorMessage) {
  //       console.error("Twitter Auth Error:", decodeURIComponent(errorMessage));
  //       return { success: false, error: decodeURIComponent(errorMessage) };
  //     }

  //     if (!data) {
  //       console.error("No auth data found in callback.");
  //       return { success: false, error: "No data in callback" };
  //     }

  //     let authData;
  //     if (isEncrypted) {
  //       authData = decryptData(data);
  //     } else {
  //       authData = JSON.parse(decodeURIComponent(data));
  //     }

  //     // Save tokens
  //     localStorage.setItem("access_token", authData.access_token);
  //     localStorage.setItem("refresh_token", authData.refresh_token);

  //     if (authData.twitter_tokens) {
  //       localStorage.setItem(
  //         "twitter_access_token",
  //         authData.twitter_tokens.access_token
  //       );
  //       if (authData.twitter_tokens.refresh_token) {
  //         localStorage.setItem(
  //           "twitter_refresh_token",
  //           authData.twitter_tokens.refresh_token
  //         );
  //       }
  //     }

  //     localStorage.setItem("user", JSON.stringify(authData.user));

  //     return { success: true, user: authData.user };
  //   } catch (error) {
  //     console.error("Error processing callback:", error);
  //     return { success: false, error: "Invalid Twitter callback data" };
  //   }
  // };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMuteUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      video.volume = isMuted ? 1 : 0;
      setIsMuted(!isMuted);
      setIsPlaying(true);
      video.play();

      gsap.fromTo(
        iconRef.current,
        { scale: 1 },
        { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.out" }
      );
    }
  };

  // Play video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video && !isPlaying) {
      video.play().catch((err) => console.warn("Autoplay failed:", err));
    }
  }, [isPlaying]);

  // Animate avatars on mount
  useEffect(() => {
    gsap.fromTo(
      avatarLeftRef.current,
      { x: "-100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      avatarRightRef.current,
      { x: "100%", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // Handle Twitter callback if redirected
  // useEffect(() => {
  //   const run = async () => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     if (urlParams.has("data")) {
  //       const result = await handleTwitterCallback();
  //       if (result.success) {
  //         router.push("/dashboard");
  //       } else {
  //         console.error("Auth failed:", result.error);
  //       }
  //     }
  //   };
  //   run();
  // }, []);
  return (
    <section className="relative bg-black overflow-hidden flex items-center justify-center h-screen text-white">
      {/* Background Video */}
      <div className="opacity-60">
        <video
          ref={videoRef}
          preload="auto"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 backdrop-blur-2xl bg-white/30"
        >
          <source src="/videos/Main.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Foreground Content */}
      <div className="mx-auto relative w-full h-full text-center flex items-center justify-center flex-col z-10">
        <div className="flex items-center justify-center gap-10 z-20 flex-col">
          {/* <div className="flex gap-4 items-center justify-center">
            <Image
              src="/Images/gettingStarted/Object.png"
              width={80}
              height={80}
              alt="Object1"
              className="lg:w-40 lg:h-50 md:w-30 object-contain"
            />
            <Image
              src="/Images/gettingStarted/Line.png"
              width={1}
              height={1}
              alt="Line1"
              className="lg:w-2 lg:h-35 md:h-20 md:w-2 object-contain"
            />
            <Image
              src="/Images/gettingStarted/Clans.png"
              width={120}
              height={60}
              alt="Clans"
              className="lg:w-90 2xl:h-50 md:w-50 object-contain"
            />
          </div> */}
          <div className="flex gap-4 items-center justify-center">
            <Image
              src="/Images/gettingStarted/Object.png"
              width={80}
              height={80}
              alt="Object1"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-50 object-contain"
            />
            <Image
              src="/Images/gettingStarted/Line.png"
              width={1}
              height={1}
              alt="Line1"
              className="w-1 h-10 sm:h-12 md:h-16 md:w-1 lg:h-24 xl:h-28 2xl:h-32 object-contain"
            />
            <Image
              src="/Images/gettingStarted/Clans.png"
              width={120}
              height={60}
              alt="Clans"
              className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 lg:w-48 lg:h-24 xl:w-56 xl:h-28 2xl:w-80 2xl:h-32 object-contain"
            />
          </div>

          <div className="mx-auto z-10 flex items-center justify-center">
            <Button
              ButtonText="Start Now"
              onClick={openModal}
              className="text-white text-2xl"
            />
          </div>
        </div>

        {/* Avatars with GSAP refs */}
        <Image
          ref={avatarLeftRef}
          src="/Images/gettingStarted/avtar1.png"
          width={550}
          height={550}
          alt="Avatar Left"
          className="absolute bottom-0 left-0 w-[300px] md:w-[350px] xl:w-[500px] 2xl:w-[540px] object-contain z-10"
        />

        <Image
          ref={avatarRightRef}
          src="/Images/gettingStarted/avtar2_.png"
          width={580}
          height={580}
          alt="Avatar Right"
          className="absolute bottom-0 right-0 w-[300px] md:w-[320px] xl:w-[500px] 2xl:w-[550px] object-contain z-10"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[308px] p-6 text-center relative">
            <div className="w-full flex items-center justify-center">
              <Image
                src="/Images/gettingStarted/logo.png"
                width={100}
                height={100}
                className="w-24 h-20 object-contain text-xl"
                alt="Logo"
                priority
              />
            </div>

            <h2 className="text-xl font-bold mb-4 text-black">
              Clans wants to access your X account
            </h2>

            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={callTwitterAuthAPI}
                className="bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Authenticate"}
              </button>
            </div>

            <p
              onClick={closeModal}
              className="text-sm text-gray-500 cursor-pointer underline mb-4"
            >
              Cancel
            </p>

            <div className="text-left text-gray-600 text-sm border-t pt-4">
              <h3 className="font-semibold mb-2">
                Things this App can view...
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>All the posts you can view, including protected posts.</li>
                <li>Any account you can view, including protected accounts.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mute Button */}
      <button
        onClick={handleMuteUnmute}
        className="absolute bottom-10 left-10 bg-black/50 px-4 py-2 rounded-full text-white flex items-center justify-center z-20 border-2 border-white/50 hover:bg-white/20 transition duration-300"
      >
        <span className="text-xl p-1" ref={iconRef}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </span>
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </section>
  );
};

export default MainPage;
