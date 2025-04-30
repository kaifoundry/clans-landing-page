"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CardData {
  image: string;
  hoverImage: string;
  title: string;
  description: string;
  glowColor: string;
  cardImage: string;
}

interface ClanContextType {
  selectedCard: CardData | null;
  setSelectedCard: (card: CardData) => void;
}

const ClanContext = createContext<ClanContextType | undefined>(undefined);

export const ClanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  return (
    <ClanContext.Provider value={{ selectedCard, setSelectedCard }}>
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
