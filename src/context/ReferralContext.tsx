'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Suspense,
} from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { ENV } from '@/constant/envvariables';
import Loader from '@/components/Features/Loader';

interface ReferralContextType {
  handleReferralCode: (userId: string) => Promise<void>;
  getAuthUrl: () => string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hasReferralCode: () => boolean;
}

const ReferralContext = createContext<ReferralContextType | undefined>(
  undefined
);

function ReferralProviderContent({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = ENV.NEXT_PUBLIC_API_BACKEND_URL;

  const hasReferralCode = () => {
    return !!Cookies.get('referral_code');
  };

  const clearReferralCookie = () => {
    Cookies.remove('referral_code', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  };

  const handleReferralCode = async (userId: string) => {
    try {
      const referralCode = Cookies.get('referral_code');
      if (!referralCode) {
        console.warn('No referral code found');
        return;
      }

      setIsLoading(true);

      const payload = {
        userId: userId,
        referralCode: referralCode,
      };


      const response = await fetch(`${BASE_URL}/api/referral/join_referral`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        clearReferralCookie();
        throw new Error(data.message || 'Failed to apply referral code');
      }

      clearReferralCookie();
      toast.success('Referral code applied successfully!');
    } catch (error: any) {
      console.error('Error applying referral code:', error);
      toast.error(error.message || 'Failed to apply referral code', {
        id: 'referral-error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAuthUrl = () => {
    if (!BASE_URL) {
      toast.error('Backend URL not configured.');
      return '#';
    }

    const referralCode = Cookies.get('referral_code');
    return referralCode
      ? `${BASE_URL}/api/V2/twitter?referralCode=${referralCode}`
      : `${BASE_URL}/api/V2/twitter`;
  };

  return (
    <ReferralContext.Provider
      value={{
        handleReferralCode,
        getAuthUrl,
        isLoading,
        setIsLoading,
        hasReferralCode,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
}

export function ReferralProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <ReferralProviderContent>{children}</ReferralProviderContent>
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
