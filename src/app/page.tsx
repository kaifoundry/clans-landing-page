'use client';
import MainPage from '@/components/MainPage';
import MobileMainPage from '@/components/MobileMainPage';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ENV } from '@/constant/envvariables';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iconRef = useRef(null);

  useEffect(() => {
    console.log(
      'NEXT_PUBLIC_API_BACKEND_URL:',
      ENV.NEXT_PUBLIC_API_BACKEND_URL
    );
    console.log('NEXT_PUBLIC_API_BASE_URL:', ENV.NEXT_PUBLIC_API_BASE_URL);
    console.log('NEXT_PUBLIC_X_HANDLER:', ENV.NEXT_PUBLIC_X_HANDLER);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.out' }
      );
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isPlaying) {
      video.play().catch((err) => console.warn('Autoplay failed:', err));
    }
  }, [isPlaying]);

  const commonProps = {
    isMuted,
    isPlaying,
    videoRef,
    iconRef,
    handleMuteUnmute,
  };

  return isMobile ? (
    <MobileMainPage {...commonProps} />
  ) : (
    <MainPage {...commonProps} />
  );
}
