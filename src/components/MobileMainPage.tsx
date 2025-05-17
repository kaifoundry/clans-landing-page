"use client";

import ClanLogo from "./ClanLogo";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { TwitterAuthProvider } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import gsap from "gsap";
import ClanLogoMobile from "./ClanLogoMobile";
import { useReferral } from "@/context/ReferralContext";
import Link from "next/link";
import { RefObject } from "react";
import Button from "./Button";


interface MobileMainPageProps {
  isMuted: boolean;
  isPlaying: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  iconRef: RefObject<HTMLSpanElement | null>;
  handleMuteUnmute: () => void;
}

const MobileMainPage = ({
  isMuted,
  isPlaying,
  videoRef,
  iconRef,
  handleMuteUnmute,
}: MobileMainPageProps) => {

  const [redirectTo, setRedirectTo] = useState<string | null>("/startRoaring");
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isMuted, setIsMuted] = useState(true);
  const router = useRouter();
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const iconRef = useRef(null);
  const provider = new TwitterAuthProvider();


  // const handleMuteUnmute = () => {
  //   const video = videoRef.current;
  //   if (video) {
  //     video.muted = !isMuted;
  //     setIsMuted(!isMuted);
  //     setIsPlaying(false);
  //     video.play();

  //     gsap.fromTo(
  //       iconRef.current,
  //       { scale: 1 },
  //       { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.out" }
  //     );
  //   }
  // };


  return (
    <>
      <section className="w-full h-dvh overflow-hidden">
        {/* Mute/Unmute Button */}
        <button
          onClick={handleMuteUnmute}
          className="absolute top-4 left-12 transform -translate-x-1/2  px-4 py-2 rounded-full text-white flex items-center justify-center z-20  hover:bg-white/20 transition duration-300"
        >
          <span className="text-xl p-1" ref={iconRef}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </span>
        </button>

        {/* Video Section */}
        <div className="opacity-100">
          <video
            ref={videoRef}
            preload="metadata"
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
          <Image
            src="/Images/gettingStarted/mobilebackground.png"
            alt="Overlay"
            fill
            style={{ opacity: 0.33 }}
            className="object-cover z-0 pointer-events-none"
            priority
          />
        </div>

        {/* Main Content Section */}
        <div className="relative flex flex-col h-dvh">
          <div className="flex flex-col items-center justify-center mt-18 pb-4 md:hidden">
            <div className="mt-0 sm:mt-8 lg:mt-0 w-64 h-24 sm:w-80 sm:h-[86px] flex items-center justify-center">
              <ClanLogoMobile />
            </div>
          </div>

          <div className="flex justify-between w-full absolute -bottom-[40px] left-0 right-0 h-full pointer-events-none">
            <Image
              src="/Images/gettingStarted/homeleft.svg"
              width={500}
              height={550}
              alt="avtar1"
              className="z-1 absolute left-0 sm:left-1 lg:left-0 -bottom-10 xs:-bottom-[40px] sm:-bottom-[55px] xxs:-bottom-[89px]  w-[220px] h-[600px] sm:w-[220px] xxs:w-[220px] sm:h-[660px] object-contain scale-105"
              draggable={false}
            />
            <Image
              src="/Images/gettingStarted/homeright.svg"
              width={400}
              height={600}
              alt="avtar2"
              className="absolute right-0 -bottom-13 sm:-bottom-10 xxs:-bottom-13 h-[700px] w-[200px] sm:h-[600px] sm:w-[200px]  xxs:w-[200px] xxs:h-[700px]  object-contain scale-110"
              draggable={false}
            />
          </div>

          {/* Start Now Button */}
          <div className="absolute bottom-14 sm:bottom-10 left-0 w-full flex items-center justify-center z-20 pointer-events-auto">
          <Link href="/startRoaring" prefetch>
            <Button
              width={270}
              height={75}
              ButtonText="Start Now!"
              className="text-3xl text-white font-semibold tracking-wide  px-8 py-4 mx-12 flex items-center justify-center "
              aria-label="Start Now"
             
            />
            </Link>
          </div>
        </div>

       
      </section>
    </>
  );
}

export default MobileMainPage;
