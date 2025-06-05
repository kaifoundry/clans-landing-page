'use client';
import Image from 'next/image';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { RefObject } from 'react';

interface ConfirmationPageProps {
  isMuted: boolean;
  isPlaying: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  iconRef: RefObject<HTMLSpanElement | null>;
  avatarLeftRef: RefObject<HTMLImageElement | null>;
  avatarRightRef: RefObject<HTMLImageElement | null>;
  handleMuteUnmute: () => void;
  firstLine: string;
  secondLine: string;

  //share functions
  handleTwitterShare: () => void;
  handleDiscordShare: () => void;
  handleWhatsAppShare: () => void;
  handleTelegramShare: () => void;
}

const ConfirmationPage = ({
  isMuted,
  videoRef,
  iconRef,
  avatarLeftRef,
  avatarRightRef,
  handleMuteUnmute,
  firstLine,
  secondLine,

  //share functions
  handleTwitterShare,
  handleDiscordShare,
  handleWhatsAppShare,
  handleTelegramShare,
}: ConfirmationPageProps) => {
  return (
    <section className='relative flex h-dvh items-center justify-center overflow-hidden bg-black text-white'>
      {/* Background Video */}
      <div className='opacity-60'>
        <video
          ref={videoRef}
          preload='auto'
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className='absolute top-0 left-0 z-0 h-full w-full bg-white/30 object-cover backdrop-blur-2xl'
        >
          <source src='/videos/Main.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Overlay Image */}
      <Image
        src='/Images/gettingStarted/background.png'
        alt='Overlay'
        fill
        style={{ opacity: 0.33 }}
        className='pointer-events-none absolute top-0 left-0 z-10 h-full w-full object-cover'
      />
      {/* Main content */}
      <div className='relative z-20 flex w-full max-w-screen-2xl flex-col items-center justify-center px-4 pt-20 text-center'>
        {/* Logo Row */}
        <div className='mb-6 flex items-center justify-center gap-4'>
          <Image
            src='/Images/gettingStarted/Object.png'
            width={80}
            height={80}
            alt='Object'
            className='w-12 sm:w-16 md:w-20'
          />
          <Image
            src='/Images/gettingStarted/Line.png'
            width={1}
            height={1}
            alt='Line1'
            className='lg2:h-18 h-10 w-1 object-contain sm:h-12 md:h-20 md:w-1 xl:h-18'
          />
          <Image
            src='/Images/gettingStarted/Clans.png'
            width={140}
            height={70}
            alt='Clans'
            className='w-[120px] sm:w-[150px] md:w-[180px]'
          />
        </div>

        {/* Heading */}
        <h1 className='lg2:text-6xl mb-4 text-3xl leading-snug font-bold sm:text-4xl md:text-5xl xl:text-7xl'>
          {firstLine}
          <br />
          {secondLine}
        </h1>

        {/* Subtext */}
        <p className='lg2:text-2xl mb-10 text-base leading-relaxed font-medium sm:text-lg md:text-xl xl:text-3xl'>
          The Clans have heard your Roar.
          <br />
          You’ll be among the 1st to know <br />
          when the gates open.
        </p>

        {/* Social Icons */}
        <div className='mb-8 flex gap-6'>
          <button
            onClick={handleTwitterShare}
            aria-label='Share on Twitter'
            className='focus:outline-none'
          >
            <Image
              src='/Images/confirmationPage/twitter.svg'
              alt='Twitter'
              width={32}
              height={32}
              className='w-6 cursor-pointer sm:w-8'
            />
          </button>

          {/* <button
            onClick={handleDiscordShare}
            aria-label='Share on Discord'
            className='focus:outline-none'
          >
            <Image
              src='/Images/confirmationPage/discord.svg'
              alt='Discord'
              width={32}
              height={32}
              className='w-6 cursor-pointer sm:w-8'
            />
          </button> */}

          <button
            onClick={handleWhatsAppShare}
            aria-label='Share on WhatsApp'
            className='focus:outline-none'
          >
            <Image
              src='/Images/confirmationPage/whatsapp.svg'
              alt='Whatsapp'
              width={32}
              height={32}
              className='w-6 cursor-pointer sm:w-8'
            />
          </button>

          <button
            onClick={handleTelegramShare}
            aria-label='Share on Telegram'
            className='focus:outline-none'
          >
            <Image
              src='/Images/confirmationPage/telegram.svg'
              alt='Telegram'
              width={32}
              height={32}
              className='w-6 cursor-pointer sm:w-8'
            />
          </button>
        </div>
      </div>
      {/* Bottom Left Avatar */}
      {/* src='/Images/gettingStarted/avtar1.png' */}
      <Image
        ref={avatarLeftRef}
        src='/Images/gettingStarted/leftavtar.svg'
        width={500}
        height={500}
        alt='Avatar Left'
        className='lg1:h-[65vh] lg2:h-[80vh] absolute -bottom-8 left-0 z-10 w-auto object-contain sm:w-[200px] md:h-[61vh] md:w-auto xl:h-screen'
      />
      {/* Bottom Right Avatar */}
      {/* src='/Images/gettingStarted/avtar2_.png' */}
      <Image
        ref={avatarRightRef}
        src='/Images/gettingStarted/rightavtar.svg'
        width={500}
        height={500}
        alt='Avatar Right'
        className='lg1:h-[61vh] lg2:h-[80vh] absolute right-0 -bottom-8 z-10 w-auto object-contain sm:w-[200px] md:h-[61vh] md:w-auto xl:h-screen'
      />
      {/* Mute Button */}
      <button
        onClick={handleMuteUnmute}
        className='absolute bottom-10 left-10 z-20 flex items-center justify-center rounded-full border-2 border-white/50 bg-black/50 px-4 py-2 text-white transition duration-300 hover:bg-white/20'
      >
        <span className='p-1 text-xl' ref={iconRef}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </span>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </section>
  );
};

export default ConfirmationPage;
