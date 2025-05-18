'use client';

import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
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

  console.log('user data is ', userData);

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

  // function userLogin(args: CreateAccountData) {
  //   try {
  //     const { name, username, twitterUserId } = args;

  //     const myHeaders = new Headers();
  //     myHeaders.append('Content-Type', 'application/json');

  //     const uuid = uuidv4();

  //     const raw = JSON.stringify({
  //       web3UserName: username + uuid,
  //       DiD: uuid,
  //       isEarlyUser: false,
  //       isActiveUser: true,
  //       activeClanId: null,
  //       socialHandles: [
  //         {
  //           provider: 'twitter',
  //           socialId: twitterUserId,
  //           username: username,
  //           displayName: name,
  //           accessToken: null,
  //           refreshToken: null,
  //         },
  //       ],
  //     });

  //     const requestOptions = {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: 'follow',
  //     };

  //     const url: string = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/user/create`;

  //     // @ts-ignore
  //     fetch(url, requestOptions)
  //       .then((response) => response.text())
  //       .then((result) => console.log(result))
  //       .catch((error) => console.error(error));
  //   } catch (err: unknown) {
  //     console.log('Error[UserRegistration]', err);
  //   }
  // }

  // Memoize the fetchUserData function
  const fetchUserData = useCallback(
    async (userid: string) => {
      if (!userid) return;

      const token = userid;

      // Check if we already have the data for this token
      // if (userData?.token === userId) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/user/getuser/${token}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (data?.success == false) {
          throw new Error(`Failed to fetch user data`);
        }

        const userDAta = data?.data;

        console.log('response is ', data);

        // set user data and all other data in localstorage
        localStorage.setItem(
          'name',
          userDAta?.socialHandles[0]?.displayName || 'NA'
        );
        localStorage.setItem(
          'username',
          userDAta?.socialHandles[0]?.username || 'NA'
        );
        localStorage.setItem('followers', userDAta?.followers || 'NA');
        localStorage.setItem('token', token),
          localStorage.setItem('user_id', userData?.userId || 'NA');

        const router = useRouter();
        // router.push('/introducingClans');
        //         {
        //     "success": true,
        //     "message": "User retrieved successfully",
        //     "data": {
        //         "userId": "300198ec-bb75-4c1a-bb27-c74bfff75d86",
        //         "web3UserName": "rajnishddd.icp1",
        //         "did": null,
        //         "isActiveUser": true,
        //         "isEarlyUser": false,
        //         "activeClanId": null,
        //         "clanJoinDate": null,
        //         "referralCode": "2UddKLi06u",
        //         "socialHandles": [
        //             {
        //                 "provider": "twitter",
        //                 "username": "rajnish_devadd",
        //                 "displayName": "Rajnish Tripathi",
        //                 "profilePicture": null
        //             }
        //         ],
        //         "wallets": [],
        //         "rewardHistory": []
        //     }
        // }

        if (data.success && data.data) {
          setUserData(data.data);
          saveUserDataToStorage(data.data);
        } else {
          throw new Error(data.message || 'Invalid response format');
        }
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
    [userData?.userId, saveUserDataToStorage]
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
