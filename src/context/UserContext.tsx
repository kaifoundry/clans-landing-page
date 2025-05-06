"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import toast from 'react-hot-toast';


interface UserData {
  userId: string;
  displayName?: string;
  referralCode?: string;
  socialHandles?: {
    username: string;
    profilePicture: string;
    displayName: string;
  }[];
  isActiveUser?: boolean;
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

  // Memoize the fetchUserData function
  const fetchUserData = useCallback(async (userId: string) => {
    if (!userId) return;
    
    // Check if we already have the data for this userId
    if (userData?.userId === userId) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/fetch/${userId}`);
      const data = await res.json();
      if (data.success && data.data) {
        setUserData(data.data);
        localStorage.setItem("userData", JSON.stringify(data.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userData?.userId]);

  // Load user data from localStorage on initial mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const value = {
    userData,
    setUserData,
    fetchUserData,
    isLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 