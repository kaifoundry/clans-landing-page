"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useReferral } from '@/context/ReferralContext';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface ReferralResponse {
  success: boolean;
  message?: string;
}

export default function ReferralPage() {
  const router = useRouter();
  const params = useParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processReferral = async () => {
      try {
        const referralCode = params.referralCode as string;
        if (!referralCode) {
          toast.error('Invalid referral code');
          router.push('/');
          return;
        }

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
        if (!apiBaseUrl) {
          toast.error('Server configuration error');
          router.push('/');
          return;
        }

        const apiUrl = `${apiBaseUrl}/api/referral/redirect/${encodeURIComponent(referralCode)}`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        let data: ReferralResponse;
        
        if (!response.headers.get('content-type')?.includes('application/json')) {
          const textResponse = await response.text();
          if (textResponse.includes('CLANS-NODE-APP is running')) {
            data = { success: true };
          } else {
            toast.error('Invalid server response');
            router.push('/');
            return;
          }
        } else {
          data = await response.json() as ReferralResponse;
        }

        if (!response.ok || !data.success) {
          toast.error(data.message || 'Invalid or expired referral code');
          router.push('/');
          return;
        }

        // Store the referral code in a cookie
        Cookies.set('referral_code', referralCode, { 
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        toast.success('Referral code saved! Please login to apply it.');
        router.push('/');
      } catch (error) {
        console.error('Error processing referral:', error);
        toast.error('Failed to process referral code');
        router.push('/');
      } finally {
        setIsProcessing(false);
      }
    };

    processReferral();
  }, []); // Empty dependency array since we're using ref

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