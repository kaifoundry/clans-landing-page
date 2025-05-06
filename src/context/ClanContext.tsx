"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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
  fetchClans: () => Promise<void>;
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

  const fetchClans = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clans/fetch/all`);
      const response = await res.json();
      if (response.success && Array.isArray(response.data)) {
        setClans(response.data);
      } else {
        setError('Invalid response format from API');
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clans/JoinClan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(joinData),
      });
      
      const data = await res.json();
      console.log('data',data)
      if (!res.ok) {
        if (data.message?.toLowerCase().includes('already a participant')) {
          handleSetSelectedCardId(joinData.clanId);
          router.push('/cardPage');
          return true;
        }
        throw new Error(data.message || 'Failed to join clan');
      }
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to join clan';
      setError(errorMessage);
      console.error('Error joining clan:', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClans();
  }, []);

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
