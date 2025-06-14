'use client';

import Button from '@/components/Button';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ClanLogo from '@/components/ClanLogoMobile';
import { v4 as uuidv4 } from 'uuid';
import { ENV } from '@/constant/envvariables';

const JoinWaitlist = () => {
  const router = useRouter();
  const params = useParams();
  const [userData, setUserData] = useState<{ userId: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        toast.error('Unable to load user data. Please try logging in again.');
      }
    } else {
      toast.error('Please log in to join the waitlist');
    }
  }, []);

  const handleJoinWaitlist = async () => {
    if (!userData || !userData.userId) {
      toast.error('User ID not found. Please login again.');
      return;
    }

    setIsLoading(true);
    const uuid = uuidv4();

    try {
      const apiUrl = `${ENV.NEXT_PUBLIC_API_BACKEND_URL}/api/user/earlyUser?userId=${params.userId}&tweetId=${params.tweetId}`;
      const token = localStorage.getItem('token') || 'NA';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // already an early
      if (data.message && data.message.includes('is already an early user')) {
        toast.success("You're already on the waitlist!");
        router.push('/ConfirmationPage');
        return;
      }

      // If response is NOT ok,
      if (!response.ok) {
        throw new Error(data.message || 'Failed to join waitlist.');
      }

      // Successful response
      toast.success('Successfully joined the waitlist!');
      router.push('/ConfirmationPage');
    } catch (error) {
      console.error('Error joining waitlist:', error);

      // Other errors
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-16 bg-[url('/Images/joinWaitlist/MobileBackground.png')] bg-cover bg-center bg-no-repeat p-10 md:gap-16 md:bg-[url('/Images/joinWaitlist/background.png')]">
      <div className='mt-10 flex h-24 w-64 items-center gap-4 md:gap-6'>
        <ClanLogo />
      </div>

      <div className='flex flex-col items-center gap-4 md:gap-6'>
        <h1 className='text-[28px] font-semibold text-nowrap text-white md:pb-[35px] md:text-6xl lg:text-[104px] lg:font-bold'>
          Early Roarers get the edge!
        </h1>

        <p className='text-center text-[18px] font-medium text-white md:text-2xl'>
          Get early access, exclusive rewards, and bragging rights.
          <br />
          The battle for the timeline starts soon.
        </p>
      </div>

      <Button
        ButtonText={isLoading ? 'Processing...' : 'Join Waitlist'}
        onClick={handleJoinWaitlist}
        disabled={isLoading || !userData}
        width={270}
        height={75}
      />

      {!userData && (
        <p className='text-sm text-yellow-300'>
          You need to be logged in to join the waitlist
        </p>
      )}
    </section>
  );
};

export default JoinWaitlist;
