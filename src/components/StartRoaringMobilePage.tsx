import Image from "next/image";
import Button from "@/components/Button";
import React, {  useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useReferral } from "@/context/ReferralContext";
import { useSearchParams } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";
import { RefObject } from "react";



interface CommonRoaringProps {
  isModalOpen: boolean;
  isLoading: boolean;
  openModal: () => void;
  closeModal: () => void;
  callTwitterAuthAPI: () => void;
  avatarLeftRef: RefObject<HTMLImageElement | null>;
  avatarRightRef?: RefObject<HTMLImageElement | null>; 
}

const StartRoaringPage = React.memo(({
  isModalOpen,
  isLoading,
  openModal,
  closeModal,
  callTwitterAuthAPI,
  avatarLeftRef,
  avatarRightRef
}: CommonRoaringProps) => {
  const { handleReferralCode } =
    useReferral();
  const modalRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
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
 

  return (
    <section className="relative w-screen h-dvh overflow-hidden bg-black flex flex-col justify-between bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center ">
      {/* Background Avatars */}
      <Image
        ref={avatarLeftRef}
        src="/Images/startRoaring/MobileAvtar1.png"
        alt="Avatar 1"
        width={400}
        height={400}
        objectFit="cover"
        className="absolute left-0 bottom-0 sm:bottom-0  w-[325px] h-[90%] sm:w-[310px] sm:h-[84%] z-0 select-none pointer-events-none object-cover object-center"
        draggable={false}
      />
      <Image
        ref={avatarRightRef}
        src="/Images/startRoaring/Avtar3.png"
        alt="Avatar 2"
        width={300}
        height={300}
        objectFit="cover"
        className="absolute right-0 bottom-0 w-[220px] h-[94%] sm:w-[250px] z-1 select-none pointer-events-none"
        draggable={false}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full mx-auto px-2 min-h-dvh">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center  text-white leading-tight mt-10 mb-8 drop-shadow-lg">
          Introducing
          <br />
          Roar Points
        </h1>

        {/* Center Card - vertically centered */}
        <div className="flex-1 flex flex-col justify-center w-full">
          <div
            className="card-container  relative text-white   w-full max-w-[370px] flex flex-col gap-4   mx-auto"
            style={{
              backgroundImage: "url('/Images/cardPage/cardVecor.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              marginTop: "45px",
            }}
          >
            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-2">
              <p
                className="text-center text-lg sm:text-xl font-normal
               text-white mb-2"
              >
                Ancient warriors had clans.
              </p>
              <p
                className="text-center text-lg sm:text-xl font-normal
               text-white mb-2"
              >
                {" "}
                You have social media.
              </p>
              <p className="text-center text-lg sm:text-xl text-white font-semibold mb-2">
                Post. Engage. Earn Roar Points.
              </p>
              <p className="text-center text-lg sm:text-xl font-normal text-white mb-2">
                Only those who join the waitlist
                <br />
                will enter the battleground.
              </p>
              <p className="text-center text-lg sm:text-xl font-normal text-white">
                Which clan will you join?
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="w-full flex justify-center mb-8 sm:mb-16">
          {/* <Link href="/introducingClans" prefetch> */}
            <Button
              onClick={openModal}
              width={270}
              height={75}
              ButtonText="Start Roaring"
              className="text-3xl text-white  font-semibold w-full max-w-[260px] drop-shadow-lg text-[21px]"
            />
          {/* </Link> */}
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
                onClick={callTwitterAuthAPI}
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
  );
  });



StartRoaringPage.displayName = 'StartRoaringPage';

export default StartRoaringPage;
