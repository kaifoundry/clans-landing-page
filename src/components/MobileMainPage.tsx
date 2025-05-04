"use client";

import ClanLogo from "./ClanLogo";
import Image from "next/image";
import Button from "./Button";
import { useState, useRef } from "react";
import { TwitterAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import gsap from "gsap";
import ClanLogoMobile from "./ClanLogoMobile";

export default function MobileMainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>("/startRoaring");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const iconRef = useRef(null);
  const provider = new TwitterAuthProvider();

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

  const loginWithTwitter = () => {
    if (typeof window === "undefined") return;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_API_BASE_URL");
      return;
    }

    window.location.assign(`${baseUrl}/api/auth/twitter`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="w-full min-h-screen overflow-hidden">
        {/* Mute/Unmute Button */}
        <button
          onClick={handleMuteUnmute}
          className="absolute top-4 left-12 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white flex items-center justify-center z-20 border-2 border-white/50 hover:bg-white/20 transition duration-300"
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
          >
            <source src="/videos/Main.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Avatars
          <Image
            src="/Images/gettingStarted/avtar1.png"
            width={550}
            height={550}
            alt="Avatar Left"
            className="absolute bottom-0 left-0 w-[300px] md:w-[350px] xl:w-[500px] 2xl:w-[540px] object-contain z-10"
          />

          <Image
            src="/Images/gettingStarted/avtar2_.png"
            width={580}
            height={580}
            alt="Avatar Right"
            className="absolute bottom-0 right-0 w-[300px] md:w-[320px] xl:w-[500px] 2xl:w-[550px] object-contain z-10"
          /> */}
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
            />
            <Image
              src="/Images/gettingStarted/mobileavtar2.png"
              width={400}
              height={600}
              alt="avtar2"
              className="absolute right-0 -bottom-10 h-[620px] w-[200px] xxs:w-[260px] object-contain scale-110"
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
                  src="/Images/gettingStarted/logo.png"
                  width={100}
                  height={100}
                  className="w-24 h-20 object-contain text-xl"
                  alt="Clans Logo"
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
                className="text-sm text-black font-bold cursor-pointer underline mb-4"
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
