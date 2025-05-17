'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Card from '@/components/Card';
import { useClan } from '@/context/ClanContext';
import { useParams, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import ClanLogo from '@/components/ClanLogo';
import { clansData } from '@/data/clansData';
import { useUser } from '@/context/UserContext';
import { useSearchParams } from 'next/navigation';
import { useReferral } from '@/context/ReferralContext';
const IntroducingClans = () => {
  const { clans, loading, error, setSelectedCardId } = useClan();
  const router = useRouter();
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { userData, fetchUserData } = useUser();
  const params = useParams();
  const searchParams = useSearchParams();
  const {  handleReferralCode } = useReferral();
  // Memoize the userId update function
  const updateUserId = useCallback(() => {
    const userIdFromParams = params?.userId;
    if (userIdFromParams) {
      const id = Array.isArray(userIdFromParams)
        ? userIdFromParams[0]
        : userIdFromParams;
      setUserId((currentUserId) => (currentUserId !== id ? id : currentUserId));
    }
  }, [params?.userId]);

  useEffect(() => {
    updateUserId();
  }, [updateUserId]);

   useEffect(() => {
    console.log('start checkauthcallback function')
    
    const checkAuthCallback = async () => {
      const userId = searchParams.get("userId");
       console.log("user id inside checkAuthcallback",userId)
      // Check if referral code exists in cookies
      const cookies = document.cookie
        .split(";")
        .reduce((acc: Record<string, string>, cookie) => {
          const [key, value] = cookie.split("=").map((c) => c.trim());
          acc[key] = decodeURIComponent(value);
          return acc;
        }, {});

      const referralCode = cookies["referral_code"];
       console.log("referal code inside checkAuthcallback", referralCode);
      if (userId) {
        if (referralCode) {
          // If both userId from URL and referralCode from cookie exist, use referralCode
          console.log("start function")
          await handleReferralCode(userId);
          console.log("end referal  function");
        } else {
          await handleReferralCode(userId);
        }

        // Clean the URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    };

    checkAuthCallback();
  }, [searchParams, handleReferralCode]);

  const handleUserDataFetch = useCallback(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
      fetchUserData(userId);
    }
  }, [userId, fetchUserData]);

  useEffect(() => {
    handleUserDataFetch();
  }, [handleUserDataFetch]);

  const cardData = Array.isArray(clans)
    ? clans.map((clan, index) => ({
        id: clan.clanId,
        title: clan.title,
        description: clan.description,
        ...clansData[index],
      }))
    : [];

  useEffect(() => {
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref, cardData[index].from, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.2,
        });

        // Hover animation
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
  }, []);

  if (!userId || loading)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
        <div className='text-3xl text-white'>Loading clans...</div>
      </div>
    );

  if (error)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
        <div className='text-xl text-white'>Error: {error}</div>
      </div>
    );

  return (
    <section className='main-section relative flex flex-col items-center gap-2 overflow-hidden px-8 py-8'>
      <span className='absolute top-10 left-10 z-10 hidden h-14 w-16 sm:h-10 sm:w-28 md:h-12 md:w-36 lg:block lg:h-14 lg:w-44 xl:h-16 xl:w-52 2xl:h-20 2xl:w-60'>
        <ClanLogo />
      </span>
      {/* <h1 className="text-[28px] md:text-4xl lg:text-5xl font-bold"> */}
      <h1 className='mt-10 text-center text-3xl font-semibold text-white md:text-4xl lg:text-4xl xl:text-5xl'>
        Introducing Clans
      </h1>

      <div className='xxs:gap-x-8 grid grid-cols-2 gap-x-16 gap-y-4 p-8 lg:grid-cols-4'>
        {cardData.map((card, index) => (
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
        ))}
      </div>

      <p className='hidden text-xl font-semibold md:block'>
        Choose your <span className='text-pink-600'>"CLAN"</span>
      </p>
    </section>
  );
};

export default IntroducingClans;
