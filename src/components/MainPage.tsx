import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import Link from 'next/link';
import StartButtonBorder from '@/constant/StartButtonBorder';
import { RefObject } from 'react';

interface MainPageProps {
  isMuted: boolean;
  isPlaying: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  iconRef: RefObject<HTMLSpanElement | null>;
  handleMuteUnmute: () => void;
}

const MainPage = ({
  isMuted,
  videoRef,
  iconRef,
  handleMuteUnmute,
}: MainPageProps) => {
  const avatarLeftRef = useRef(null);
  const avatarRightRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      avatarLeftRef.current,
      { x: '-100%', opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    );
    gsap.fromTo(
      avatarRightRef.current,
      { x: '100%', opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <section className='relative flex h-screen items-center justify-center overflow-hidden bg-black text-white'>
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
        <Image
          src='/Images/gettingStarted/background.png'
          alt='Background overlay'
          fill
          style={{ opacity: 0.33 }}
          className='pointer-events-none z-0 object-cover'
        />
      </div>

      {/* Main Content */}
      <main className='relative z-10 mx-auto flex h-full w-full flex-col items-center justify-center text-center'>
        <div className='z-20 flex flex-col items-center justify-center gap-10'>
          <div className='flex items-center justify-center gap-4'>
            <Image
              src='/Images/gettingStarted/clansLogo.svg'
              width={80}
              height={80}
              alt='Clans Logo'
              className='h-20 w-20 object-contain sm:h-24 sm:w-80 md:h-32 md:w-100 lg:h-40 lg:w-120 xl:h-48 xl:w-130 2xl:h-56 2xl:w-150'
              draggable={false}
              priority
            />
          </div>
          <div className='z-10 mx-auto flex items-center justify-center'>
            <Link href='/startRoaring' prefetch>
              <button className='group relative z-10 min-h-[40px] w-full cursor-pointer transition-transform hover:scale-105 active:scale-95 md:h-[79px] md:w-[307px] lg:h-[70px] lg:w-[280px]'>
                <StartButtonBorder />
                <span className='absolute inset-0 z-10 flex items-center justify-center text-base font-semibold tracking-wide text-white sm:text-lg lg:text-xl'>
                  Start Now
                </span>
              </button>
            </Link>
          </div>
        </div>
        {/* Avatars with GSAP refs */}
        {/* md:w-[350px] xl:w-[600px] 2xl:w-[600px] */}
        <Image
          ref={avatarLeftRef}
          src='/Images/gettingStarted/avtar1.png'
          width={550}
          height={600}
          alt='Avatar Left'
          className='absolute bottom-0 left-0 z-10 w-4/12 object-contain'
          draggable={false}
        />
        {/* md:w-[320px] xl:w-[620px] 2xl:w-[620px] */}
        <Image
          ref={avatarRightRef}
          src='/Images/gettingStarted/avtar2_.png'
          width={580}
          height={600}
          alt='Avatar Right'
          className='absolute right-0 bottom-0 z-10 w-[35%] object-contain'
          draggable={false}
        />
      </main>

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

export default MainPage;
