'use client';

import { useState, useEffect, useRef } from 'react';
import ConfirmationPageDesktop from '@/components/ConfirmationPageDesktop';
import ConfirmationPageMobile from '@/components/ConfirmationPageMobile';
import { gsap } from 'gsap';

export default function StartRoaring() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const avatarLeftRef = useRef<HTMLImageElement>(null);
  const avatarRightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
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

      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { scale: 1 },
          {
            scale: 1.3,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power1.out',
          }
        );
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isPlaying) {
      video.play().catch((err) => console.warn('Autoplay failed:', err));
    }
  }, [isPlaying]);

  useEffect(() => {
    if (avatarLeftRef.current && avatarRightRef.current) {
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
    }
  }, []);

  const commonProps = {
    isMuted,
    isPlaying,
    videoRef,
    iconRef,
    avatarLeftRef,
    avatarRightRef,
    handleMuteUnmute,
  };

  return isMobile ? (
    <ConfirmationPageMobile />
  ) : (
    <ConfirmationPageDesktop {...commonProps} />
  );
}
