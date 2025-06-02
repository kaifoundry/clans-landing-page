'use client';

import { ENV } from '@/constant/envvariables';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import toast from 'react-hot-toast';
interface UserData {
  userId: string;

  displayName?: string;
  referralCode?: string;
  followers?: string;
  socialHandles?: {
    username: string;
    profilePicture: string;
    displayName: string;
  }[];
  isActiveUser?: boolean;
}

export interface CreateAccountData {
  name: string;
  username: string;
  twitterUserId: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  fetchUserData: (userId: string) => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user data from localStorage on initial mount
  useEffect(() => {
    const isLocalStorageAvailable = () => {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (isLocalStorageAvailable()) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('userData');
        }
      }
    } else {
      console.warn('localStorage is not available on this device');
    }
  }, []);

  const saveUserDataToStorage = useCallback((data: UserData) => {
    if (!data) return;

    try {
      localStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
      // Handle storage quota exceeded
      if (
        error instanceof DOMException &&
        error.name === 'QuotaExceededError'
      ) {
        console.warn('Storage quota exceeded, clearing old data');
        localStorage.clear();
        try {
          localStorage.setItem('userData', JSON.stringify(data));
        } catch (retryError) {
          console.error(
            'Failed to save user data after clearing storage:',
            retryError
          );
        }
      }
    }
  }, []);

  // Memoize the fetchUserData function
  const fetchUserData = useCallback(
    async (userid: string) => {
      if (!userid) {
        toast.error('User ID is required to fetch user data.');
        return;
      }

      const token = userid;
      setIsLoading(true);

      try {
        const res = await fetch(
          `${ENV.NEXT_PUBLIC_API_BACKEND_URL}/api/user/getuser/${token}`
        );

        if (!res.ok) {
          toast.error(`HTTP error! status: ${res.status}`);
        }

        // Try to parse JSON, but handle invalid/malformed responses
        let data: any;
        try {
          data = await res.json();
        } catch (jsonError) {
          // Log the raw response for debugging
          const text = await res.text();
          toast.error(text);
          console.error('Invalid JSON from API:', text);
        }

        if (!data || data.success === false) {
          // console.log(data?.message);
        }

        const userDAta = data.data;

        // Safely set user data and other info in localStorage
        try {
          localStorage.setItem(
            'name',
            userDAta?.socialHandles?.[0]?.displayName || 'NA'
          );
          localStorage.setItem(
            'username',
            userDAta?.socialHandles?.[0]?.username || 'NA'
          );
          localStorage.setItem('followers', userDAta?.followers || 'NA');
          localStorage.setItem('user_id', userDAta?.userId || 'NA');
          localStorage.setItem('token', token);
        } catch (storageError) {
          console.error('Error saving to localStorage:', storageError);
          toast.error('Could not save user data locally.');
        }

        setUserData(userDAta);
        saveUserDataToStorage(userDAta);
      } catch (error) {
        console.error('Error fetching user data:', error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to fetch user data. Please try again.';
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [saveUserDataToStorage]
  );

  const value = {
    userData,
    setUserData,
    fetchUserData,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
