'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import StartRoaringMobile from '@/components/StartRoaringMobilePage';
import StartRoaringDesktop from '@/components/startRoaringDesktop';
import { useReferral } from '@/context/ReferralContext';
import { gsap } from 'gsap';
import toast from 'react-hot-toast';

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function StartRoaring() {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatarLeftRef = useRef<HTMLImageElement>(null);
  const avatarRightRef = useRef<HTMLImageElement>(null);
  const { getAuthUrl, isLoading, setIsLoading } = useReferral();

  const handleResize = useCallback(
    debounce(() => {
      setIsMobile(window.innerWidth <= 768);
    }, 100),
    []
  );

  const callTwitterAuthAPI = useCallback(async () => {
    try {
      setIsLoading(true);
      const authUrl = getAuthUrl();
      const currentUrl = window.location.href;
      sessionStorage.setItem('redirectUrl', currentUrl);
      window.location.assign(authUrl);
    } catch (error) {
      console.error('Twitter authentication failed:', error);
      toast.error('Authentication failed. Please try again.');
    }finally{
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
     
    }
  }, [getAuthUrl, setIsLoading]);
 
  
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    if (avatarLeftRef.current) {
      gsap.fromTo(
        avatarLeftRef.current,
        { x: '-200', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );
    }

    if (avatarRightRef.current) {
      gsap.fromTo(
        avatarRightRef.current,
        { x: '200', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const commonProps = {
    isModalOpen,
    isLoading,
    openModal,
    closeModal,
    callTwitterAuthAPI,
    avatarLeftRef,
    avatarRightRef,
  };

  return (
    <main>
      {isMobile ? (
        <StartRoaringMobile {...commonProps} />
      ) : (
        <StartRoaringDesktop {...commonProps} />
      )}
    </main>
  );
}
