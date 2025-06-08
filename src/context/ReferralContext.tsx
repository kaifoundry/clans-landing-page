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
  const [referralError, setReferralError] = useState<string | null>(null);
  const BASE_URL = ENV.NEXT_PUBLIC_API_BACKEND_URL;

  // Check if there's a valid referral code
  const hasReferralCode = () => {
    return !!Cookies.get('referral_code');
  };

  // Handle referral code usage after authentication
  const handleReferralCode = async (userId: string) => {
    try {
      const referralCode = Cookies.get('referral_code');
      if (!referralCode) {
        console.warn('No referral code found');
        return;
      }

      const finalUserId =  localStorage.getItem('user_id');
      if (!finalUserId) {
        console.warn('❌ No user ID provided or found in localStorage');
        return;
      }

      setIsLoading(true);
      setReferralError(null);
      const payload = {
        user_id: finalUserId,
        referral_code: referralCode,
      };
 
      console.log('📦 Sending referral payload:', payload);
      const response = await fetch(`${BASE_URL}/api/referral/join_referral`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   user_id: userId,
        //   referral_code: referralCode,
        // }),
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('📨 Server response:', response.status, data);

      if (!response.ok) {
        // Clear the referral code cookie if invalid or failed
        Cookies.remove('referral_code', {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        throw new Error(data.message || 'Failed to apply referral code');
      }

      // Clear the referral code cookie after successful use
      Cookies.remove('referral_code', {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      // console.log('Referral applied successfully, showing toast');
      toast.success('Referral code applied successfully!');
    } catch (error: any) {
      console.error('Error applying referral code:', error);
      // toast.error( 'Failed to apply referral code testing ');
      toast.error(error.message || 'Failed to apply referral code', {
        id: 'referral-error',
      });
      // toast.error(error.message || 'Failed to apply referral code');
      // setReferralError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Get auth URL with referral code if exists
  const getAuthUrl = () => {
    if (!BASE_URL) {
      console.error('Missing NEXT_PUBLIC_API_BACKEND_URL');
      return '';
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
    <Suspense
      fallback={
        <></>
        // <div className='flex items-center justify-center text-center'>
        //   Loading...
        // </div>
      }
    >
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
