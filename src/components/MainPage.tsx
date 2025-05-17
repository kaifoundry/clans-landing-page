"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import Link from "next/link";
import StartButtonBorder from "@/constant/StartButtonBorder";
import { RefObject } from "react";

interface MainPageProps {
  isMuted: boolean;
  isPlaying: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  iconRef: RefObject<HTMLSpanElement | null>;
  handleMuteUnmute: () => void;
}

const MainPage = ({
  isMuted,
  isPlaying,
  videoRef,
  iconRef,
  handleMuteUnmute,
}: MainPageProps) => {
  // const [isMuted, setIsMuted] = useState(true);
  // const [isPlaying, setIsPlaying] = useState(false);

  // const videoRef = useRef<HTMLVideoElement>(null);
  // const iconRef = useRef(null);
  const avatarLeftRef = useRef(null);
  const avatarRightRef = useRef(null);
  const router = useRouter();


  // const handleMuteUnmute = () => {
  //   const video = videoRef.current;
  //   if (video) {
  //     video.muted = !isMuted;
  //     video.volume = isMuted ? 1 : 0;
  //     setIsMuted(!isMuted);
  //     setIsPlaying(true);
  //     video.play();

  //     gsap.fromTo(
  //       iconRef.current,
  //       { scale: 1 },
  //       { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.out" }
  //     );
  //   }
  // };

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (video && !isPlaying) {
  //     video.play().catch((err) => console.warn("Autoplay failed:", err));
  //   }
  // }, [isPlaying]);

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

        {/* Image overlay over video */}
        <Image
          src="/Images/gettingStarted/background.png" // Replace with your actual overlay image path
          alt="Overlay"
          fill
          style={{ opacity: 0.33 }}
          className="object-cover z-0 pointer-events-none"
        />
      </div>

      {/* Foreground Content */}
      <div className="mx-auto relative w-full h-full text-center flex items-center justify-center flex-col z-10">
        <div className="flex items-center justify-center gap-10 z-20 flex-col">
          <div className="flex gap-4 items-center justify-center">
            <Image
              src="/Images/gettingStarted/clansLogo.svg"
              width={80}
              height={80}
              alt="Object1"
              className="w-20 h-20 sm:w-80 sm:h-24 md:w-100 md:h-32 lg:w-120 lg:h-40 xl:w-130 xl:h-48 2xl:w-150 2xl:h-56 object-contain"
              draggable={false}
            />
          </div>

          <div className="mx-auto z-10 flex items-center justify-center">
            <Link href="/startRoaring" prefetch>
              <button className="group relative z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95 w-full min-h-[40px] lg:w-[280px] lg:h-[70px] md:w-[307px] md:h-[79px]">
                <StartButtonBorder />
                <span className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide z-10 text-base sm:text-lg lg:text-xl">
                  Start Now
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Avatars with GSAP refs */}
        <Image
          ref={avatarLeftRef}
          src="/Images/gettingStarted/avtar1.png"
          width={550}
          height={550}
          alt="Avatar Left"
          className="absolute bottom-0 left-0 w-[300px] md:w-[350px] xl:w-[530px] 2xl:w-[540px] object-contain z-10"
          draggable={false}
        />

        <Image
          ref={avatarRightRef}
          src="/Images/gettingStarted/avtar2_.png"
          width={580}
          height={580}
          alt="Avatar Right"
          className="absolute bottom-0 right-0 w-[300px] md:w-[320px] xl:w-[550px] 2xl:w-[550px] object-contain z-10"
          draggable={false}
        />
      </div>

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



