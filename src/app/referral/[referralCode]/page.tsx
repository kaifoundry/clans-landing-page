"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function ReferralPage() {
  const router = useRouter();
  const params = useParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const referralCode = params.referralCode as string;

    if (!referralCode) {
      toast.error('Invalid referral code');
      router.push('/');
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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-white text-center">
        <h1 className="text-2xl mb-4">Processing your referral...</h1>
        {isProcessing && (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
        )}
      </div>
    </div>
  );
}
