'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ENV } from '@/constant/envvariables';

interface Clan {
  clanId: string;
  title: string;
  description: string;
  banner: string;
  clanScore: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface JoinClanData {
  clanId: string;
  userId: string;
}

interface ClanContextType {
  clans: Clan[];
  loading: boolean;
  error: string | null;
  fetchClans: (token?: string) => Promise<void>;
  joinClan: (joinData: JoinClanData) => Promise<boolean>;
  checkUserJoinedClan: (userId: string) => Promise<boolean>;
  selectedCardId: string | null;
  setSelectedCardId: (id: string | null) => void;
}

const ClanContext = createContext<ClanContextType | undefined>(undefined);

export function ClanProvider({ children }: { children: ReactNode }) {
  const [clans, setClans] = useState<Clan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const router = useRouter();

  // Initialize selectedCardId from localStorage
  useEffect(() => {
    try {
      const storedCardId = localStorage.getItem('selectedCardId');
      if (storedCardId) {
        setSelectedCardId(storedCardId);
      }
    } catch (err) {
      console.error('Error reading from localStorage:', err);
    }
  }, []);

  // Custom setter function to update both state and localStorage
  const handleSetSelectedCardId = (id: string | null) => {
    setSelectedCardId(id);
    try {
      if (id) {
        localStorage.setItem('selectedCardId', id);
      } else {
        localStorage.removeItem('selectedCardId');
      }
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  };

  const fetchClans = async (token?: string) => {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('token') || '';
      if (!authToken || authToken === 'NA') {
        console.warn(
          'No authentication token available, will retry when token is available'
        );
        setError('Authentication required');
        return;
      }

      const res = await fetch(
        `${ENV.NEXT_PUBLIC_API_BACKEND_URL}/api/clans/fetch/all`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response?.message || 'API returned an error');
      }

      if (response?.success && Array.isArray(response?.data)) {
        setClans(response.data);
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch clans');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClan = async (joinData: JoinClanData) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token') || 'NA';

      const res = await fetch(
        `${ENV.NEXT_PUBLIC_API_BACKEND_URL}/api/clans/JoinClan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(joinData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        if (data?.success === true) {
          handleSetSelectedCardId(joinData.clanId);
          return true;
        } else if (data?.success === false) {
          toast.error(data.message);
          return false;
        } else {
          toast.error(data.message);
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to join clan';
      toast.error(errorMessage);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkUserJoinedClan = async (userId: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      if (!token || token === 'NA') {
        throw new Error('Authentication required');
      }

      const response = await fetch(
        `${ENV.NEXT_PUBLIC_API_BACKEND_URL}/api/clans/check?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to check clan membership');
      }

      if (typeof data.hasJoined !== 'boolean') {
        console.warn(
          'Unexpected response format from checkjoined-clan endpoint'
        );
        return false;
      }

      return data.hasJoined;
    } catch (error) {
      console.error('Error checking clan membership:', error);
      throw error;
    }
  };
  return (
    <ClanContext.Provider
      value={{
        clans,
        loading,
        error,
        fetchClans,
        joinClan: handleJoinClan,
        checkUserJoinedClan,
        selectedCardId,
        setSelectedCardId: handleSetSelectedCardId,
      }}
    >
      {children}
    </ClanContext.Provider>
  );
}

export function useClan() {
  const context = useContext(ClanContext);
  if (context === undefined) {
    throw new Error('useClan must be used within a ClanProvider');
  }
  return context;
}
