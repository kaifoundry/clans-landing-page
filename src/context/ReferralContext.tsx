"use client";

import { createContext, useContext, useEffect, useState, ReactNode, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import ClanLogo from '@/components/ClanLogo';

interface ReferralContextType {
  handleReferralCode: (userId: string) => Promise<void>;
  getAuthUrl: () => string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hasReferralCode: () => boolean;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

function ReferralProviderContent({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLoading, setReferralLoading] = useState(false);
  const [referralError, setReferralError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Check if there's a valid referral code
  const hasReferralCode = () => {
    return !!Cookies.get('referral_code');
  };

  // Handle referral code usage after authentication
  const handleReferralCode = async (userId: string) => {
    console.log('Handling referral code...');
    try {
      const referralCode = Cookies.get('referral_code');
      if (!referralCode) {
        console.log('No referral code found');
        return;
      }

      if (!userId) {
        console.log('No user ID provided');
        return;
      }

      setIsLoading(true);
      setReferralError(null);

      const response = await fetch(`${BASE_URL}/api/referral/join_referral`, {
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
      Cookies.remove('referral_code', {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      toast.success('Referral code applied successfully!');
    } catch (error: any) {
      console.error('Error applying referral code:', error);
      toast.error(error.message || 'Failed to apply referral code');
      setReferralError(error.message);
    } finally {
      setIsLoading(false);
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
      ? `${BASE_URL}/api/V2/twitter?referralCode=${referralCode}`
      : `${BASE_URL}/api/V2/twitter`;
  };

  return (
    <ReferralContext.Provider value={{ 
      handleReferralCode, 
      getAuthUrl, 
      isLoading, 
      setIsLoading,
      hasReferralCode 
    }}>
      {children}
    </ReferralContext.Provider>
  );
}

export function ReferralProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReferralProviderContent>
        {children}
      </ReferralProviderContent>
    </Suspense>
  );
}

export function useReferral() {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return context;
} 