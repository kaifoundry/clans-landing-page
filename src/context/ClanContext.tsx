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
import { BACKEND_URL } from '@/app/page';

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
        console.log(
          'No authentication token available, will retry when token is available'
        );
        setError('Authentication required');
        return;
      }
      const res = await fetch(`${BACKEND_URL}/api/clans/fetch/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      const response = await res.json();
      console.log('Response from fetchClans:', response);
      console.log('Fetched clans:', response.data);
      if (response.success && Array.isArray(response.data)) {
        setClans(response.data);
      } else {
        window.location.reload();
        console.log('Invalid response format or no clans found');
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

      const res = await fetch(`${BACKEND_URL}/api/clans/JoinClan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(joinData),
      });

      const data = await res.json();
      console.log('data', data);

      if (res.ok) {
        if (data?.success === true) {
          toast.success(data.message);
          handleSetSelectedCardId(joinData.clanId);
          router.push('/cardPage');
          return true;
        } else if (data?.success === false) {
          // Show error in toast instead of setting error state
          toast.error(data.message);
          return false;
        } else {
          toast.error(data.message);
          return false;
        }
      } else {
        console.log(res.status);
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to join clan';
      toast.error(errorMessage);
      setError(errorMessage);
      console.error('Error joining clan:', errorMessage);
      return false;
    } finally {
      setLoading(false);
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
