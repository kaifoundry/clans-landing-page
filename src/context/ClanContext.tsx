"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ClanContextType {
  selectedCardId: number | null;
  setSelectedCardId: (id: number) => void;
}

const ClanContext = createContext<ClanContextType | undefined>(undefined);

export const ClanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  return (
    <ClanContext.Provider value={{ selectedCardId, setSelectedCardId }}>
      {children}
    </ClanContext.Provider>
  );
};



export const useClan = () => {
  const context = useContext(ClanContext);
  if (context === undefined) {
    throw new Error("useClan must be used within a ClanProvider");
  }
  return context;
};
