'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import ClanLogo from '@/components/ClanLogo';
import { LuLoaderCircle } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import React, { RefObject } from 'react';

interface CommonRoaringProps {
  isModalOpen: boolean;
  isLoading: boolean;
  openModal: () => void;
  closeModal: () => void;
  callTwitterAuthAPI: () => void;
  avatarLeftRef: RefObject<HTMLImageElement | null>;
  avatarRightRef?: RefObject<HTMLImageElement | null>;
}

const StartRoaringPage = React.memo(
  ({
    isModalOpen,
    isLoading,
    openModal,
    closeModal,
    callTwitterAuthAPI,
    avatarLeftRef,
  }: CommonRoaringProps) => {
    return (
      <main className="relative mx-auto flex h-screen w-full flex-col items-center justify-center gap-y-8 overflow-hidden bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center px-6 py-10">
        {/* Clan Logo */}
        <header className='xs:w-16 xs:h-16 lg2:h-32 lg2:w-32 absolute top-10 left-10 h-14 w-14 transition-all duration-300 ease-in-out sm:h-20 sm:w-20 md:h-24 md:w-24 xl:h-40 xl:w-40 2xl:h-48 2xl:w-48'>
          <ClanLogo />
        </header>

        {/* Page Title */}
        <section className='z-10'>
          <h1 className='lg1:text-4xl mt-12 text-center text-xl font-bold text-white md:text-4xl xl:text-5xl'>
            Introducing Roar Points
          </h1>
        </section>
        <div className='relative mx-auto w-full max-w-[100rem]'>
          {/* Center Card Section */}
          <section className='z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 md:px-0'>
            <article
              className='lg2:h-[530px] lg2:w-[958px] lg2:gap-12 relative flex w-full flex-col items-center justify-center rounded px-10 py-8 md:gap-5 lg:h-[400px] lg:w-[700px]'
              style={{
                backgroundImage: "url('/Images/startRoaring/centerbg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Text Content */}
              <div className='flex h-full flex-col items-center justify-center'>
                <p className='xl2:text-2xl text-center text-lg leading-8 text-white md:text-xl md:leading-10 xl:text-2xl'>
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
                src='/Images/startRoaring/Avtar1.png'
                alt='Stylized avatar character 1'
                width={200}
                height={200}
                className='lg2:right-5 lg2:bottom-2 lg2:w-[300px] absolute right-5 bottom-2 h-auto w-[120px] max-w-full rounded-r-4xl md:right-4 md:bottom-3 md:w-[230px] 2xl:w-[350px]'
                priority
                draggable={false}
              />
            </article>

            {/* Navigation Button */}
            <nav className='mt-6 flex w-full justify-center md:mt-0 lg:w-[958px] lg:justify-end'>
              <Button
                onClick={openModal}
                ButtonText='Start Roaring'
                width={307}
                height={79}
                className='lg2:mr-4 mr-[8.5rem]'
              />
            </nav>
          </section>

          {/* Left Avatar Image (animated) */}
          <Image
            ref={avatarLeftRef}
            src='/Images/startRoaring/Avtar2_alt.png'
            height={550}
            width={440}
            alt='Stylized avatar character 2'
            className='lg2:left-[-60px] lg2:bottom-[-170px] lg2:max-h-[660px] lg2:w-[495px] xl2:w-[638px] absolute bottom-[-130px] left-[-40px] z-0 h-auto max-h-[495px] w-[352px] max-w-full object-contain md:bottom-[-150px] md:left-[-50px] md:z-10 md:max-h-[572px] md:w-[418px] xl:bottom-[-190px] xl:left-[-70px] xl:max-h-[748px] xl:w-[572px] 2xl:left-[18px]'
            priority
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
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            >
              <motion.section
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='relative w-[308px] rounded-2xl bg-white p-6 text-center shadow-lg'
                aria-modal='true'
                role='dialog'
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

                <button
                  onClick={closeModal}
                  className='mb-4 cursor-pointer border-0 bg-transparent text-base font-bold text-red-500'
                  aria-label='Cancel'
                  type='button'
                >
                  Cancel
                </button>

                <div className='border-t border-[#EBEBEB] pt-4 text-left'>
                  {/* <center> */}
                  <h3 className='mb-2 font-bold text-[#141414]'>
                    Permission required by Clans
                  </h3>
                  {/* </center> */}
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
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }
);

StartRoaringPage.displayName = 'StartRoaringPage';

export default StartRoaringPage;
