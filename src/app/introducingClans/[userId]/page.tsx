'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Card from '@/components/Card';
import { useClan } from '@/context/ClanContext';
import { useParams, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import ClanLogo from '@/components/ClanLogo';
import { clansData } from '@/data/clansData';
import { useUser } from '@/context/UserContext';
import { useReferral } from '@/context/ReferralContext';
import Loader from '@/components/Features/Loader';

const SkeletonCard = () => (
  <div className='h-56 w-full animate-pulse rounded-xl bg-gray-700'></div>
);

const IntroducingClans = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [delayPassed, setDelayPassed] = useState(false);

  const { clans, loading, error, setSelectedCardId, fetchClans } = useClan();
  const { userData, fetchUserData } = useUser();
  const { handleReferralCode, hasReferralCode } = useReferral();

  const router = useRouter();
  const params = useParams();
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const hasHandledReferral = useRef(false);
  const hasFetchedClans = useRef(false);

  // Delay to control UI flicker
  useEffect(() => {
    const timeout = setTimeout(() => setDelayPassed(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  // Poll token and fetch clans
  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && storedToken !== 'NA') {
        setToken(storedToken);
        if (!hasFetchedClans.current) {
          fetchClans(storedToken);
          hasFetchedClans.current = true;
        }
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fetchClans]);

  // Fetch userId and userData
  useEffect(() => {
    const userIdFromParams = params?.userId;
    if (userIdFromParams) {
      const id = Array.isArray(userIdFromParams)
        ? userIdFromParams[0]
        : userIdFromParams;
      setUserId(id);
      localStorage.setItem('userId', id);
      fetchUserData(id);
    }
  }, [params?.userId, fetchUserData]);

  // Handle referral once
  useEffect(() => {
    if (userId && hasReferralCode() && !hasHandledReferral.current) {
      hasHandledReferral.current = true;
      (async () => {
        await handleReferralCode(userId);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      })();
    }
  }, [userId, handleReferralCode, hasReferralCode]);

  const cardData = useMemo(() => {
    return Array.isArray(clans)
      ? clans.map((clan, index) => ({
          id: clan.clanId,
          title: clan.title,
          description: clan.description,
          ...clansData[index],
        }))
      : [];
  }, [clans]);

  // Animate cards
  useEffect(() => {
    if (!cardData.length || cardRefs.current.length !== cardData.length) return;

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power1.out',
            delay: index * 0.05,
          }
        );

        const onEnter = () => {
          gsap.to(ref, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power1.out',
          });
        };
        const onLeave = () => {
          gsap.to(ref, {
            scale: 1,
            duration: 0.3,
            ease: 'power1.out',
          });
        };

        ref.addEventListener('mouseenter', onEnter);
        ref.addEventListener('mouseleave', onLeave);

        return () => {
          ref.removeEventListener('mouseenter', onEnter);
          ref.removeEventListener('mouseleave', onLeave);
        };
      }
    });
  }, [cardData]);

  const shouldShowSkeleton = delayPassed && cardData.length === 0 && !error;
  const shouldShowNothing = !delayPassed && cardData.length === 0;

  if (loading && !clans?.length && !delayPassed) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
        <div className='text-xl text-white'>Error: {error}</div>
      </div>
    );
  }

  if (shouldShowNothing) return null;

  return (
    <section className='main-section relative flex flex-col items-center gap-2 overflow-hidden px-8 py-8'>
      <span className='lg2:h-14 lg2:w-44 absolute top-10 left-10 z-10 hidden h-14 w-16 sm:h-10 sm:w-28 md:h-12 md:w-36 lg:block xl:h-16 xl:w-52 2xl:h-20 2xl:w-60'>
        <ClanLogo />
      </span>

      <h1 className='lg2:text-4xl mt-10 text-center text-3xl font-semibold text-white md:text-4xl xl:text-5xl'>
        Introducing Clans
      </h1>

      <div className='xxs:gap-x-8 grid grid-cols-2 gap-x-16 gap-y-4 p-8 lg2:grid-cols-4'>
        {cardData.length > 0
          ? cardData.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                onClick={() => {
                  setSelectedCardId(card.id.toString());
                  router.push('/selectClan');
                }}
                className='cursor-pointer'
                draggable={false}
              >
                <Card
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  hoverImage={card.hoverImage}
                  glowColor={card.glowColor}
                />
              </div>
            ))
          : shouldShowSkeleton &&
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>

      <p className='hidden text-xl font-semibold md:block'>
        Choose your <span className='text-pink-600'>"CLAN"</span>
      </p>
    </section>
  );
};

export default IntroducingClans;
