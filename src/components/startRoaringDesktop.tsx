'use client';

import Image from "next/image";
import Button from "@/components/Button";
import ClanLogo from "@/components/ClanLogo"; 
import { LuLoaderCircle } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import React, { RefObject } from "react";



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
}: CommonRoaringProps) => {


    return (
      <section className="relative flex h-screen w-full flex-col items-center justify-center gap-y-8 overflow-hidden bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center px-6 py-12">
        {/* Clan Logo */}
        <span className='xs:w-16 xs:h-16 absolute top-10 left-10 h-14 w-14 transition-all duration-300 ease-in-out sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 xl:h-40 xl:w-40 2xl:h-48 2xl:w-48'>
          <ClanLogo />
        </span>
      
        {/* Page Title */}
        <div className=" z-10">
          {" "}
          {/*  title is above potential overlaps */}
          <h2 className="text-xl lg:text-4xl xl:text-5xl md:text-4xl text-center text-white font-bold mt-20">
            Introducing Roar Points
          </h2>
        </div>
        {/* Center Card Section */}
        <div className='z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 md:px-0'>
          <div
            className='relative flex w-full flex-col items-center justify-center rounded px-10 py-8 md:gap-5 lg:h-[530px] lg:w-[958px] lg:gap-12'
            style={{
              backgroundImage: "url('/Images/startRoaring/centerbg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Text Content */}
            <div className='flex h-full flex-col items-center justify-center'>
              <p className='text-center text-lg leading-8 text-white md:text-xl md:leading-10'>
                Ancient warriors had clans.
                <br /> You have social media. <br />
                <span className='font-bold'>
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
              width={200} 
              height={200} 
              className="absolute bottom-2 rounded-r-4xl right-5 w-[120px] h-auto md:w-[300px] lg:w-[280px] 2xl:w-[350px] max-w-full" // Responsive sizing
              priority 
              draggable={false}
            />
          </div>

          {/* Navigation Button */}
          <div className='mt-6 flex w-full justify-center md:mt-0 lg:w-[958px] lg:justify-end'>
            {/* <Link href="/introducingClans" prefetch> */}
            <Button
              onClick={openModal}
              ButtonText='Start Roaring'
              width={307}
              height={79}
              className='mr-4'
            />
            {/* </Link> */}
          </div>
        </div>
        {/* Left Avatar Image (animated) */}
        <Image
          ref={avatarLeftRef} 
          src="/Images/startRoaring/Avtar2.png"
          height={500} // Base height
          width={500} // Base width
          alt="Stylized avatar character 2"
          className="absolute bottom-0 left-0 z-0 md:z-10 w-[250px] h-auto md:w-[300px] lg:w-[400px] xl:w-[500px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:left-20 xl:left-10 md:left-0 max-w-full" // Responsive sizing and positioning
          priority 
          draggable={false}
        />

        {/* Modal with animation */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='relative w-[308px] rounded-2xl bg-white p-6 text-center shadow-lg'
              >
                <div className='flex w-full items-center justify-center'>
                  <Image
                    src='/logo.svg'
                    width={100}
                    height={100}
                    className='h-20 w-24 object-contain text-xl'
                    alt='Logo'
                    draggable={false}
                    priority
                  />
                </div>

                <h2 className='mb-4 text-xl font-bold text-black'>
                  Clans wants to access your X account
                </h2>

                <div className='mb-4 flex flex-col gap-3'>
                  <button
                    onClick={callTwitterAuthAPI}
                    className='cursor-pointer rounded-full bg-black py-3 text-base font-bold text-white transition duration-300 hover:bg-gray-800'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className='flex items-center justify-center'>
                        <span className='pr-1'>Authenticating</span>
                        <LuLoaderCircle className='animate-spin' />
                      </span>
                    ) : (
                      'Authenticate'
                    )}
                  </button>
                </div>

                <p
                  onClick={closeModal}
                  className='mb-4 cursor-pointer text-base font-bold text-red-500'
                >
                  Cancel
                </p>

                <div className='border-t border-[#EBEBEB] pt-4 text-left'>
                  <center>
                    <h3 className='mb-2 font-bold text-[#141414]'>
                      Permission required by Clans
                    </h3>
                  </center>
                  <h3 className='mb-2 text-sm font-bold text-[#141414]'>
                    Things this App can do...
                  </h3>
                  <ul className='list-outside list-disc space-y-1 pl-5 leading-relaxed'>
                    <li className='text-sm font-[500] text-[#525252]'>
                      Post and repost for you.
                    </li>
                  </ul>

                  <h3 className='mt-4 mb-2 text-sm font-bold text-[#141414]'>
                    Things this App can view...
                  </h3>
                  <ul className='list-outside list-disc space-y-1 pl-5 leading-relaxed'>
                    <li className='text-sm font-[500] text-[#525252]'>
                      All the posts you can view, including posts from protected
                      accounts.
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }
);

StartRoaringPage.displayName = 'StartRoaringPage';

export default StartRoaringPage;
