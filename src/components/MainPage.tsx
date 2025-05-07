"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useReferral } from "@/context/ReferralContext";
import { LuLoaderCircle } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const MainPage = () => {
  const { getAuthUrl, handleReferralCode, isLoading, setIsLoading } =
    useReferral();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const iconRef = useRef(null);
  const avatarLeftRef = useRef(null);
  const avatarRightRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthCallback = async () => {
      const userId = searchParams.get("userId");
      if (userId) {
        await handleReferralCode(userId);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    };

    checkAuthCallback();
  }, [searchParams, handleReferralCode]);

  const callTwitterAuthAPI = async () => {
    try {
      setIsLoading(true);
      const authUrl = getAuthUrl();
      const currentUrl = window.location.href;
      sessionStorage.setItem("redirectUrl", currentUrl);
      window.location.assign(authUrl);
    } catch (error) {
      console.error("Error during Twitter auth:", error);
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isPlaying) {
      video.play().catch((err) => console.warn("Autoplay failed:", err));
    }
  }, [isPlaying]);

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
              src="/Images/gettingStarted/Object.png"
              width={80}
              height={80}
              alt="Object1"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-50 object-contain"
              draggable={false}
            />
            <Image
              src="/Images/gettingStarted/Line.png"
              width={1}
              height={1}
              alt="Line1"
              className="w-1 h-10 sm:h-12 md:h-16 md:w-1 lg:h-24 xl:h-28 2xl:h-32 object-contain"
              draggable={false}
            />
            <Image
              src="/Images/gettingStarted/Clans.png"
              width={120}
              height={60}
              alt="Clans"
              className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 lg:w-48 lg:h-24 xl:w-66 xl:h-28 2xl:w-80 2xl:h-32 object-contain"
              draggable={false}
            />
          </div>

          <div className="mx-auto z-10 flex items-center justify-center">
            <button
              onClick={openModal}
              className="group relative z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95 w-full min-h-[40px] lg:w-[280px] lg:h-[70px] md:w-[307px] md:h-[79px]"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 309 81"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
                  className="fill-black group-hover:fill-[rgba(212,0,165,0.16)] transition-colors duration-300"
                />
                <path
                  d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
                  stroke="white"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />
              </svg>

              <span className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide z-10 text-base sm:text-lg lg:text-xl">
                Start Now
              </span>
            </button>
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
                  Things this App can view...
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






// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Button from "./Button";
// import { useRouter, useSearchParams } from "next/navigation";
// import { gsap } from "gsap";
// import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
// import { useReferral } from "@/context/ReferralContext";
// import { LuLoaderCircle } from "react-icons/lu";
// import { motion, AnimatePresence } from "framer-motion";

// const MainPage = () => {
//   const { getAuthUrl, handleReferralCode, isLoading, setIsLoading } =
//     useReferral();
//   const searchParams = useSearchParams();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const iconRef = useRef(null);
//   const avatarLeftRef = useRef(null);
//   const avatarRightRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuthCallback = async () => {
//       const userId = searchParams.get("userId");
//       if (userId) {
//         await handleReferralCode(userId);
//         const newUrl = window.location.pathname;
//         window.history.replaceState({}, "", newUrl);
//       }
//     };

//     checkAuthCallback();
//   }, [searchParams, handleReferralCode]);

//   const callTwitterAuthAPI = async () => {
//     try {
//       setIsLoading(true);
//       const authUrl = getAuthUrl();
//       const currentUrl = window.location.href;
//       sessionStorage.setItem("redirectUrl", currentUrl);
//       window.location.assign(authUrl);
//     } catch (error) {
//       console.error("Error during Twitter auth:", error);
//       setIsLoading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleMuteUnmute = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.muted = !isMuted;
//       video.volume = isMuted ? 1 : 0;
//       setIsMuted(!isMuted);
//       setIsPlaying(true);
//       video.play();

//       gsap.fromTo(
//         iconRef.current,
//         { scale: 1 },
//         { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.out" }
//       );
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video && !isPlaying) {
//       video.play().catch((err) => console.warn("Autoplay failed:", err));
//     }
//   }, [isPlaying]);

//   useEffect(() => {
//     gsap.fromTo(
//       avatarLeftRef.current,
//       { x: "-100%", opacity: 0 },
//       { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
//     );
//     gsap.fromTo(
//       avatarRightRef.current,
//       { x: "100%", opacity: 0 },
//       { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
//     );
//   }, []);

//   return (
//     <section className="relative bg-black overflow-hidden flex items-center justify-center h-screen text-white">
//       {/* Background Video */}
//       <div className="opacity-60">
//         <video
//           ref={videoRef}
//           preload="auto"
//           autoPlay
//           loop
//           muted={isMuted}
//           playsInline
//           className="absolute top-0 left-0 w-full h-full object-cover z-0 backdrop-blur-2xl bg-white/30"
//         >
//           <source src="/videos/Main.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Foreground Content */}
//       <div className="mx-auto relative w-full h-full text-center flex items-center justify-center flex-col z-10">
//         <div className="flex items-center justify-center gap-10 z-20 flex-col">
//           <div className="flex gap-4 items-center justify-center">
//             <Image
//               src="/Images/gettingStarted/Object.png"
//               width={80}
//               height={80}
//               alt="Object1"
//               className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-50 object-contain"
//               draggable={false}
//             />
//             <Image
//               src="/Images/gettingStarted/Line.png"
//               width={1}
//               height={1}
//               alt="Line1"
//               className="w-1 h-10 sm:h-12 md:h-16 md:w-1 lg:h-24 xl:h-28 2xl:h-32 object-contain"
//               draggable={false}
//             />
//             <Image
//               src="/Images/gettingStarted/Clans.png"
//               width={120}
//               height={60}
//               alt="Clans"
//               className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 lg:w-48 lg:h-24 xl:w-66 xl:h-28 2xl:w-80 2xl:h-32 object-contain"
//               draggable={false}
//             />
//           </div>

//           <div className="mx-auto z-10 flex items-center justify-center">
//             <button
//               onClick={openModal}
//               className="group relative z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95 w-full min-h-[40px] lg:w-[280px] lg:h-[70px] md:w-[307px] md:h-[79px]"
//             >
//               <svg
//                 width="100%"
//                 height="100%"
//                 viewBox="0 0 309 81"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="absolute top-0 left-0 w-full h-full"
//                 preserveAspectRatio="none"
//               >
//                 <path
//                   d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
//                   className="fill-black group-hover:fill-[rgba(212,0,165,0.16)] transition-colors duration-300"
//                 />
//                 <path
//                   d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
//                   stroke="white"
//                   strokeOpacity="0.4"
//                   strokeWidth="1.5"
//                 />
//               </svg>

//               <span className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide z-10 text-base sm:text-lg lg:text-xl">
//                 Start Now
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Avatars with GSAP refs */}
//         <Image
//           ref={avatarLeftRef}
//           src="/Images/gettingStarted/avtar1.png"
//           width={550}
//           height={550}
//           alt="Avatar Left"
//           className="absolute bottom-0 left-0 w-[300px] md:w-[350px] xl:w-[530px] 2xl:w-[540px] object-contain z-10"
//           draggable={false}
//         />

//         <Image
//           ref={avatarRightRef}
//           src="/Images/gettingStarted/avtar2_.png"
//           width={580}
//           height={580}
//           alt="Avatar Right"
//           className="absolute bottom-0 right-0 w-[300px] md:w-[320px] xl:w-[550px] 2xl:w-[550px] object-contain z-10"
//           draggable={false}
//         />
//       </div>

//       {/* Modal with animation */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="bg-white rounded-2xl shadow-lg w-[308px] p-6 text-center relative"
//             >
//               <div className="w-full flex items-center justify-center">
//                 <Image
//                   src="/logo.svg"
//                   width={100}
//                   height={100}
//                   className="w-24 h-20 object-contain text-xl"
//                   alt="Logo"
//                   draggable={false}
//                   priority
//                 />
//               </div>

//               <h2 className="text-xl font-bold mb-4 text-black">
//                 Clans wants to access your X account
//               </h2>

//               <div className="flex flex-col gap-3 mb-4">
//                 <button
//                   onClick={callTwitterAuthAPI}
//                   className="bg-black text-white py-3 rounded-full text-base font-bold hover:bg-gray-800 transition duration-300 cursor-pointer"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center justify-center">
//                       <span className="pr-1">Authenticating</span>
//                       <LuLoaderCircle className="animate-spin" />
//                     </span>
//                   ) : (
//                     "Authenticate"
//                   )}
//                 </button>
//               </div>

//               <p
//                 onClick={closeModal}
//                 className="text-base text-[#141414] font-bold cursor-pointer mb-4"
//               >
//                 Cancel
//               </p>

//               <div className="text-left border-t border-[#EBEBEB] pt-4">
//                 <h3 className="font-bold mb-2 text-sm text-[#141414]">
//                   Things this App can view...
//                 </h3>
//                 <ul className="list-disc list-outside pl-5 space-y-1 leading-relaxed">
//                   <li className="font-[500] text-sm text-[#525252]">
//                     All the posts you can view, including posts from protected
//                     accounts.
//                   </li>
//                   <li className="font-[500] text-sm text-[#525252]">
//                     Any account you can view, including protected accounts.
//                   </li>
//                 </ul>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Mute Button */}
//       <button
//         onClick={handleMuteUnmute}
//         className="absolute bottom-10 left-10 bg-black/50 px-4 py-2 rounded-full text-white flex items-center justify-center z-20 border-2 border-white/50 hover:bg-white/20 transition duration-300"
//       >
//         <span className="text-xl p-1" ref={iconRef}>
//           {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
//         </span>
//         {isMuted ? "Unmute" : "Mute"}
//       </button>
//     </section>
//   );
// };

// export default MainPage;
