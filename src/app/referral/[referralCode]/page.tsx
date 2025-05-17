'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function ReferralPage() {
  const router = useRouter();
  const params = useParams();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const referralCode = params.referralCode as string | undefined;

    if (!referralCode || typeof referralCode !== "string" || referralCode.trim() === "") {
      setTimeout(() => {
        toast.error('Invalid referral code');
        router.replace('/');
      }, 1200); 
      return;
    }

    // Store the referral code in a cookie
    Cookies.set('referral_code', referralCode, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    toast.success('Referral code saved! Please login to apply it.');
    router.push('/');
  }, []);

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
