'use client';

import Image from 'next/image';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import ClanLogoMobile from './ClanLogoMobile';
import Link from 'next/link';
import { RefObject } from 'react';
import Button from './Button';

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
  return (
    <main className='h-dvh w-full overflow-hidden'>
      {/* Mute/Unmute Button */}
      <button
        onClick={handleMuteUnmute}
        className='absolute top-4 left-12 z-20 flex -translate-x-1/2 transform items-center justify-center rounded-full px-4 py-2 text-white transition duration-300 hover:bg-white/20'
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        <span className='p-1 text-xl' ref={iconRef}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </span>
      </button>

      {/* Video Section */}
      <section className='opacity-100'>
        <video
          ref={videoRef}
          preload='metadata'
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className='absolute top-0 left-0 z-0 h-full w-full bg-white/30 object-cover backdrop-blur-2xl'
          draggable={false}
        >
          <source src='/videos/Main.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <Image
          src='/Images/gettingStarted/mobilebackground.png'
          alt='Overlay'
          fill
          style={{ opacity: 0.33 }}
          className='pointer-events-none z-0 object-cover'
          priority
        />
      </section>

      {/* Main Content Section */}
      <section className='relative flex h-dvh flex-col'>
        <header className='mt-18 flex flex-col items-center justify-center pb-4 md:hidden'>
          <div className='mt-0 flex h-24 w-64 items-center justify-center sm:mt-8 sm:h-[86px] sm:w-80 lg:mt-0'>
            <ClanLogoMobile />
          </div>
        </header>

        <aside className='pointer-events-none absolute right-0 -bottom-[40px] left-0 flex h-full w-full justify-between'>
          <Image
            src='/Images/gettingStarted/homeleft.svg'
            width={500}
            height={550}
            alt='Avatar left'
            className='xs:-bottom-[40px] xxs:-bottom-[89px] xxs:w-[220px] absolute -bottom-10 left-0 z-1 h-[600px] w-[220px] scale-105 object-contain sm:-bottom-[55px] sm:left-1 sm:h-[660px] sm:w-[220px] lg:left-0'
            draggable={false}
          />
          <Image
            src='/Images/gettingStarted/homeright.svg'
            width={400}
            height={600}
            alt='Avatar right'
            className='xxs:-bottom-13 xxs:w-[200px] xxs:h-[700px] absolute right-0 -bottom-13 h-[700px] w-[200px] scale-110 object-contain sm:-bottom-10 sm:h-[600px] sm:w-[200px]'
            draggable={false}
          />
        </aside>

        {/* Start Now Button */}
        <nav className='pointer-events-auto absolute bottom-14 left-0 z-20 flex w-full items-center justify-center sm:bottom-10'>
          <Link href='/startRoaring' prefetch>
            <Button
              width={270}
              height={75}
              ButtonText='Start Now!'
              className='mx-12 flex items-center justify-center px-8 py-4 text-3xl font-semibold tracking-wide text-white'
              aria-label='Start Now'
            />
          </Link>
        </nav>
      </section>
    </main>
  );
};

export default MobileMainPage;
