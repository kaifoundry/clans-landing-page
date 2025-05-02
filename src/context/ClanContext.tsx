"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ✅ 1. Update types to use `string` instead of `number`
interface ClanContextType {
  selectedCardId: string | null;
  setSelectedCardId: (id: string) => void;
}

// ✅ 2. Initialize with `string | null`
const ClanContext = createContext<ClanContextType | undefined>(undefined);

export const ClanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  return (
    <ClanContext.Provider value={{ selectedCardId, setSelectedCardId }}>
      {children}
    </ClanContext.Provider>
  );
};

// ✅ 3. Hook remains the same
export const useClan = () => {
  const context = useContext(ClanContext);
  if (context === undefined) {
    throw new Error("useClan must be used within a ClanProvider");
  }
  return context;
};
