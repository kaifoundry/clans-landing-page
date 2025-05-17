'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function ReferralPage() {
  const router = useRouter();
  const params = useParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const hasProcessed = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const processReferral = async () => {
      if (hasProcessed.current) return;
      hasProcessed.current = true;

      try {
        const referralCode = params.referralCode as string | undefined;

        // Validate referral code
        if (!referralCode?.trim()) {
          setIsProcessing(false);
          toast.error('Invalid referral code');
          setTimeout(() => router.replace('/'), 1200);
          return;
        }

        // Store referral code
        Cookies.set('referral_code', referralCode.trim(), {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        setIsProcessing(false);
        toast.success('Referral code saved! Please login to apply it.');
        router.push('/');
      } catch (error) {
        setIsProcessing(false);
        toast.error('Failed to process referral');
        setTimeout(() => router.replace('/'), 1200);
      }
    };

    processReferral();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [params.referralCode, router]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-black'>
      <div className='text-center text-white'>
        <h1 className='mb-4 text-2xl'>Processing your referral...</h1>
        {isProcessing && (
          <div className='mx-auto h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-white'></div>
        )}
      </div>
    </div>
  );
}
