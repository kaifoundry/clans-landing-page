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
import Button1 from "./Button1";
import { LuLoaderCircle } from "react-icons/lu";

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
  const modalRef = useRef<HTMLDivElement>(null);
  const provider = new TwitterAuthProvider();

  // Check for authentication callback
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

  // Animate modal when it opens
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isModalOpen]);

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
            <div className="mt-0 sm:mt-16 lg:mt-0 w-64 h-24 sm:w-80 sm:h-[86px] flex items-center justify-center">
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
          <div className="absolute bottom-14 left-0 w-full flex items-center justify-center z-20 pointer-events-auto">
            <Button1
              width={270}
              height={75}
              ButtonText="Start Now!"
              className="text-3xl text-white font-semibold tracking-wide  px-8 py-4 mx-12 flex items-center justify-center "
              aria-label="Start Now"
              onClick={openModal}
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="bg-white rounded-2xl shadow-lg w-[308px] p-6 text-center relative"
            >
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

              <h2 className="text-2xl font-semibold mb-4 text-black font-['Segoe UI']">
                Clans wants to access your X account
              </h2>

              <div className="flex flex-col gap-3 mb-4">
                <button
                  onClick={loginWithTwitter}
                  className="bg-black text-base text-white py-3 rounded-full font-bold hover:bg-gray-800 transition duration-300 cursor-pointer"
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

              <p
                onClick={closeModal}
                className="text-base text-red-500 font-bold cursor-pointer mb-4"
              >
                Cancel
              </p>

              <div className="text-left border-t border-[#EBEBEB] pt-4">
                <h3 className="font-semibold mb-2 text-sm text-[#141414] ">
                  Things this App can view...
                </h3>
                <ul className="list-disc list-outside pl-5 space-y-1 leading-relaxed ">
                  <li className="font-[500] text-sm text-[#525252]">
                    All the posts you can view, including posts from protected
                    accounts.
                  </li>
                  <li className="font-[500] text-sm text-[#525252]">
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



// "use client";

// import ClanLogo from "./ClanLogo";
// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import { TwitterAuthProvider } from "firebase/auth";
// import { useRouter, useSearchParams } from "next/navigation";
// import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
// import gsap from "gsap";
// import ClanLogoMobile from "./ClanLogoMobile";
// import { useReferral } from "@/context/ReferralContext";
// import Button1 from "./Button1";
// import { LuLoaderCircle } from "react-icons/lu";

// export default function MobileMainPage() {
//   const { getAuthUrl, handleReferralCode, isLoading, setIsLoading } = useReferral();
//   const searchParams = useSearchParams();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [redirectTo, setRedirectTo] = useState<string | null>("/startRoaring");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const router = useRouter();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const iconRef = useRef(null);
//   const provider = new TwitterAuthProvider();

//   // Check for authentication callback
//   useEffect(() => {
//     const checkAuthCallback = async () => {
//       const userId = searchParams.get('userId');
//       if (userId) {
//         // Handle the referral code if it exists
//         await handleReferralCode(userId);
        
//         // Clear the URL parameters
//         const newUrl = window.location.pathname;
//         window.history.replaceState({}, '', newUrl);
//       }
//     };

//     checkAuthCallback();
//   }, [searchParams, handleReferralCode]);

//   const handleMuteUnmute = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.muted = !isMuted;
//       setIsMuted(!isMuted);
//       setIsPlaying(false);
//       video.play();

//       gsap.fromTo(
//         iconRef.current,
//         { scale: 1 },
//         { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.out" }
//       );
//     }
//   };

//   const loginWithTwitter = async () => {
//     if (typeof window === "undefined") return;

//     try {
//       setIsLoading(true);
//       const authUrl = getAuthUrl();
      
//       // Store the current URL to handle the redirect back
//       const currentUrl = window.location.href;
//       sessionStorage.setItem('redirectUrl', currentUrl);

//       window.location.assign(authUrl);
//     } catch (error) {
//       console.error("Error during Twitter auth:", error);
//       setIsLoading(false);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <section className="w-full h-screen overflow-hidden">
//         {/* Mute/Unmute Button */}
//         <button
//           onClick={handleMuteUnmute}
//           className="absolute top-4 left-12 transform -translate-x-1/2  px-4 py-2 rounded-full text-white flex items-center justify-center z-20  hover:bg-white/20 transition duration-300"
//         >
//           <span className="text-xl p-1" ref={iconRef}>
//             {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
//           </span>
//           {/* {isMuted ? "Unmute" : "Mute"} */}
//         </button>

//         {/* Video Section */}
//         <div className="opacity-100">
//           <video
//             ref={videoRef}
//             preload="auto"
//             autoPlay
//             loop
//             muted={isMuted}
//             playsInline
//             className="absolute top-0 left-0 w-full h-full object-cover z-0 backdrop-blur-2xl bg-white/30"
//             draggable={false}
//           >
//             <source src="/videos/Main.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         {/* Main Content Section */}
//         <div className="relative flex flex-col h-screen">
//           <div className="flex flex-col items-center justify-center mt-18 pb-4 md:hidden">
//             <div className="mt-0 sm:mt-16 lg:mt-0 w-64 h-24 sm:w-80 sm:h-[86px] flex items-center justify-center">
//               <ClanLogoMobile />
//             </div>
//           </div>

//           <div className="flex justify-between w-full absolute -bottom-[40px] left-0 right-0 h-full pointer-events-none">
//             <Image
//               src="/Images/gettingStarted/homeleft.svg"
//               width={500}
//               height={550}
//               alt="avtar1"
//               className="z-1 absolute left-0 sm:left-1 lg:left-0   -bottom-10 xs:-bottom-[40px] sm:-bottom-[55px] xxs:-bottom-[89px]  w-[220px] h-[600px] sm:w-[220px] xxs:w-[220px] sm:h-[660px] object-contain scale-105"
//               draggable={false}
//             />
//             <Image
//               src="/Images/gettingStarted/homeright.svg"
//               width={400}
//               height={600}
//               alt="avtar2"
//               className="absolute right-0 -bottom-13 sm:-bottom-10 xxs:-bottom-13 h-[700px] w-[200px] sm:h-[600px] sm:w-[200px]  xxs:w-[200px] xxs:h-[700px]  object-contain scale-110"
//               draggable={false}
//             />
//           </div>

//           {/* Start Now Button in semi-transparent box, centered at bottom */}
//           <div className="absolute bottom-14 left-0 w-full flex items-center justify-center z-20 pointer-events-auto">
//             <Button1
//               width={270}
//               height={75}
//               ButtonText="Start Now!"
//               className="text-3xl text-white font-semibold tracking-wide  px-8 py-4 mx-12 flex items-center justify-center "
//               aria-label="Start Now"
//               onClick={openModal}
//             />
//           </div>
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl shadow-lg w-[308px] p-6 text-center relative">
//               <div className="w-full flex items-center justify-center">
//                 <Image
//                   src="/logo.svg"
//                   width={100}
//                   height={100}
//                   className="w-24 h-20 object-contain text-xl"
//                   alt="Clans Logo"
//                   draggable={false}
//                 />
//               </div>

//               <h2 className="text-xl font-bold mb-4 text-black font-['Segoe UI']">
//                 Clans wants to access your X account
//               </h2>

//               <div className="flex flex-col gap-3 mb-4">
//                 <button
//                   onClick={loginWithTwitter}
//                   className="bg-black text-base text-white py-3 rounded-full font-bold hover:bg-gray-800 transition duration-300 cursor-pointer"
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
//                 className="text-base text-red-500 font-bold cursor-pointer  mb-4"
//               >
//                 Cancel
//               </p>

//               <div className="text-left   border-t border-[#EBEBEB]  pt-4">
//                 <h3 className="font-semibold mb-2 text-sm text-[#141414] ">
//                   Things this App can view...
//                 </h3>
//                 <ul className="list-disc list-outside pl-5 space-y-1 leading-relaxed ">
//                   <li className="font-[500] text-sm text-[#525252]">
//                     All the posts you can view, including posts from protected
//                     accounts.
//                   </li>
//                   <li className="font-[500] text-sm text-[#525252]">
//                     Any account you can view, including protected accounts.
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// }
