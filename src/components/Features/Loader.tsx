'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({
  message = 'Loading Clans, please wait...',
  logoSrc = '/Images/gettingStarted/Object.png',
  visible = true,
  onHide = () => {},
}) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  // Entrance animation
  useEffect(() => {
    if (visible) {
      const tl = gsap.timeline();

      tl.fromTo(
        loaderRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );

      tl.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      );

      gsap.to(logoRef.current, {
        rotation: 360,
        repeat: -1,
        ease: 'linear',
        duration: 1.2, // Faster spin
      });
    }
  }, [visible]);

  // Exit animation
  useEffect(() => {
    if (!visible) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          setShowLoader(false);
          onHide();
        },
      });
    }
  }, [visible]);

  if (!showLoader) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center bg-no-repeat"
    >
      <img
        ref={logoRef}
        src={logoSrc}
        alt='Loading Logo'
        className='mb-6 h-32 w-32 object-contain'
      />
      <p
        ref={textRef}
        className='text-center text-xl font-semibold tracking-wide text-white'
      >
        {message}
      </p>
    </div>
  );
};

export default Loader;
