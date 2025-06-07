'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ConfirmationPageDesktop from '@/components/ConfirmationPageDesktop';
import ConfirmationPageMobile from '@/components/ConfirmationPageMobile';
import { gsap } from 'gsap';
import { ENV } from '@/constant/envvariables';
export default function StartRoaring() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const avatarLeftRef = useRef<HTMLImageElement>(null);
  const avatarRightRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
   const [userData, setUserData] = useState<null | {
    userId: string;
    displayName: string;
    referralCode?: string;
    followers: string;
    socialHandles?: {
      username: string;
      profilePicture: string;
      displayName: string;
    }[];
  }>(null);

  //  website URL and  text
  const shareUrl = `${ENV.NEXT_PUBLIC_API_BASE_URL}/referral/${userData?.referralCode}`;
const shareDomain = 'clans.kilt.io';
const shareText = `A new world order for Attention. Pick your trait. Join your clan. Roar louder!`;

  // Get the message from the URL query params
  const searchParams = useSearchParams();
  const message =
    searchParams.get('message') || 'You’re officially a Roarer !';
  const [firstLine, secondLine] = splitMessageInTwoLines(message);

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

  // Social share helper to open popup window
  function openShareWindow(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  }
  // Share functions
  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    openShareWindow(url);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText + ' ' + shareUrl
    )}`;
    openShareWindow(url);
  };

  const handleTelegramShare = () => {
    const url = `https://telegram.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    openShareWindow(url);
  };

  const handleDiscordShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Clans',
          text: shareText,
          url: shareUrl,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      alert(
        'Sharing not supported on this browser. Please copy the link manually: ' +
          shareUrl
      );
    }
  };

  function splitMessageInTwoLines(message: string | null) {
    if (!message) return ['', ''];
    // Special case: "You’re officially a Roarer !🎉"
    if (message.trim() === 'You’re officially a Roarer !🎉') {
      return ['You’re officially', 'a Roarer !🎉'];
    }
    // Special case: "You’re already a registered Roarer!"
    const alreadyIdx = message.indexOf('already');
    if (alreadyIdx !== -1) {
      const after = alreadyIdx + 'already'.length;
      return [message.slice(0, after), message.slice(after + 1)];
    }
    // Default: no split
    return [message, ''];
  }
  const commonProps = {
    isMuted,
    isPlaying,
    videoRef,
    iconRef,
    avatarLeftRef,
    avatarRightRef,
    handleMuteUnmute,
    firstLine,
    secondLine,

    //share link
    handleTwitterShare,
    handleWhatsAppShare,
    handleTelegramShare,
    handleDiscordShare,
  };

  return isMobile ? (
    <ConfirmationPageMobile
      firstLine={firstLine}
      secondLine={secondLine}
      handleTwitterShare={handleTwitterShare}
      handleWhatsAppShare={handleWhatsAppShare}
      handleTelegramShare={handleTelegramShare}
      handleDiscordShare={handleDiscordShare}
    />
  ) : (
    <ConfirmationPageDesktop {...commonProps} />
  );
}
