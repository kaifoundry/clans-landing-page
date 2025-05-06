"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface ReferralContextType {
  handleReferralCode: (userId: string) => Promise<void>;
  getAuthUrl: () => string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export function ReferralProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Handle referral code from URL
  useEffect(() => {
    const referralCode = searchParams.get('referralCode');
    if (referralCode) {
      // Store referral code in cookie for 7 days
      Cookies.set('referral_code', referralCode, { expires: 7 });
    }
  }, [searchParams]);

  // Handle referral code usage after authentication
  const handleReferralCode = async (userId: string) => {
    try {
      const referralCode = Cookies.get('referral_code');
      if (!referralCode) return;

      const response = await fetch(`${BASE_URL}/api/auth/join_referral`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          referralCode,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to apply referral code');
      }

      // Clear the referral code cookie after successful use
      Cookies.remove('referral_code');
      
      toast.success('Referral code applied successfully!');
    } catch (error: any) {
      console.error('Error applying referral code:', error);
      toast.error(error.message || 'Failed to apply referral code');
    }
  };

  // Get auth URL with referral code if exists
  const getAuthUrl = () => {
    if (!BASE_URL) {
      console.error("Missing NEXT_PUBLIC_API_BASE_URL");
      return '';
    }

    const referralCode = Cookies.get('referral_code');
    return referralCode 
      ? `${BASE_URL}/api/auth/twitter?referralCode=${referralCode}`
      : `${BASE_URL}/api/auth/twitter`;
  };

  return (
    <ReferralContext.Provider value={{ handleReferralCode, getAuthUrl, isLoading, setIsLoading }}>
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferral() {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return context;
} 