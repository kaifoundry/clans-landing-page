'use client';

import { useState, useEffect, useMemo } from 'react';
import SelectClanDesktop from '@/components/SelectClanDesktop';
import SelectClanMobile from '@/components/SelectClanMobile';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { clansData } from '@/data/selectClanData';
import { useClan } from '@/context/ClanContext';

export default function SelectClan() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const router = useRouter();
  const {
    clans,
    loading,
    error,
    selectedCardId,
    setSelectedCardId,
    checkUserJoinedClan,
    fetchClans,
  } = useClan();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedDescription, setDisplayedDescription] = useState('');
  const [clanColor, setClanColor] = useState<string>('#ffffff');
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    image: string;
    hoverImage: string;
    cardImage: string;
    title: string;
    description: string;
    glowColor: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingClanId, setPendingClanId] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'NA') {
      fetchClans(token);
    } else {
      console.warn('Waiting for authentication token...');
    }
  }, []);

  const cardData = useMemo(() => {
    return Array.isArray(clans)
      ? clans.map((clan, index) => {
          const clanData = clansData[index] || {};
          return {
            id: clan.clanId,
            title: clan.title,
            description: clan.description,
            image: clanData.image || '',
            hoverImage: clanData.hoverImage || '',
            cardImage: clanData.image || '',
            glowColor: clanData.glowColor || '',
          };
        })
      : [];
  }, [clans]);

  useEffect(() => {
    if (selectedCardId !== null) {
      const clan = cardData.find((card) => card.id === String(selectedCardId));
      if (clan) {
        const index = cardData.findIndex((c) => c.id === clan.id);
        setActiveIndex(index !== -1 ? index : null);
        setSelectedCard(clan);
        setAvatarImage(clan.hoverImage);
        setDisplayedTitle(clan.title);
        setDisplayedDescription(clan.description);
      }
    }
  }, [selectedCardId, cardData]);

  const handleJoinClan = (clanId: string) => {
    setPendingClanId(clanId);
    setSelectedCardId(clanId);
    const clan = cardData.find((card) => card.id === clanId);
    if (clan) {
      setSelectedCard(clan);
    }
    setModalOpen(true);
  };

  const handleConfirmJoin = async () => {
    setModalOpen(false);
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    const storedUserId = user?.userId;

    if (!storedUserId || !pendingClanId) {
      toast.error('Missing user or clan ID.');
      return;
    }

    try {
      const hasJoined = await checkUserJoinedClan(storedUserId);

      if (hasJoined) {
        toast.success('You are already in a clan!');
        router.push('/ConfirmationPage');
      } else {
        setSelectedCardId(pendingClanId);
        localStorage.setItem('joinedClanId', pendingClanId);
        router.push('/CardPage');
      }
    } catch (error) {
      toast.error('Failed to check clan status.');
      console.error('Clan membership check error:', error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add debounced resize listener
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const isMobile = useMemo(() => windowWidth <= 768, [windowWidth]);
  const commonProps = {
    cardData,
    selectedCard,
    setSelectedCard,
    selectedCardId,
    setSelectedCardId,
    activeIndex,
    setActiveIndex,
    hoveredIndex,
    setHoveredIndex,
    avatarImage,
    setAvatarImage,
    displayedTitle,
    setDisplayedTitle,
    displayedDescription,
    setDisplayedDescription,
    handleJoinClan,
    handleConfirmJoin,
    modalOpen,
    setModalOpen,
    loading,
    error,
  };

  return isMobile ? (
    <SelectClanMobile
      {...commonProps}
      clanColor={clanColor}
      setClanColor={setClanColor}
    />
  ) : (
    <SelectClanDesktop {...commonProps} />
  );
}
