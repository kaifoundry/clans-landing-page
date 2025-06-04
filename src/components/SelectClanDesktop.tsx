'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { clansData } from '@/data/selectClanData';
import Loader from './Features/Loader';
import { useClan } from '@/context/ClanContext';
import { motion, AnimatePresence } from 'framer-motion';
import StartButtonBorder from '@/constant/StartButtonBorder';

export interface ClanCard {
  id: string;
  image: string;
  hoverImage: string;
  cardImage: string;
  title: string;
  description: string;
  glowColor: string;
}

export interface SelectClanDesktopProps {
  cardData: ClanCard[];
  selectedCard: ClanCard | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<ClanCard | null>>;
  selectedCardId: string | null;
  setSelectedCardId: (id: string) => void;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
  avatarImage: string;
  setAvatarImage: React.Dispatch<React.SetStateAction<string>>;
  displayedTitle: string;
  setDisplayedTitle: React.Dispatch<React.SetStateAction<string>>;
  displayedDescription: string;
  setDisplayedDescription: React.Dispatch<React.SetStateAction<string>>;
  handleJoinClan: (clanId: string) => void;
  handleConfirmJoin: () => Promise<void>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  error: string | null;
}

const SelectClan: React.FC<SelectClanDesktopProps> = ({
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
}) => {
  // if (loading) return <div className="flex justity-center items-center">Loading clans...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (loading)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
        <div className='text-3xl text-white'>Loading clans...</div>
      </div>
    );

  if (error)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
        <div className='text-xl text-white'>Error: {error}</div>
      </div>
    );
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center">
      <div className='mx-auto flex w-full max-w-screen-2xl flex-grow flex-col gap-20 px-8 py-20 md:gap-x-4 2xl:gap-x-12'>
        <div className='text-white'>
          <div className='flex items-center gap-x-2'>
            <div
              className='h-10 w-1 transition-all duration-300'
              style={{
                background:
                  hoveredIndex !== null
                    ? cardData[hoveredIndex]?.glowColor
                    : selectedCard?.glowColor || '#6D28D9',
              }}
            ></div>

            <h2 className='font-bold text-white md:text-4xl lg:text-4xl'>
              {displayedTitle}
            </h2>
          </div>
          <p className='my-2 font-semibold text-white md:text-xl lg:text-3xl'>
            {displayedDescription}
          </p>
        </div>

        <div className='lg:flex-col-4 md:flex-col-2 z-1 mx-0 flex w-3/4 items-center gap-12'>
          {cardData.map((clan, index) => (
            <div
              key={clan.id}
              onClick={() => {
                if (activeIndex !== index) {
                  setActiveIndex(index);
                  setAvatarImage(clan.hoverImage);
                  setSelectedCard(clan);
                  setSelectedCardId(clan.id);
                  setDisplayedTitle(clan.title);
                  setDisplayedDescription(clan.description);
                }
              }}
              onMouseEnter={() => {
                if (hoveredIndex !== index) {
                  setHoveredIndex(index);
                  setAvatarImage(clan.hoverImage);
                  setDisplayedTitle(clan.title);
                  setDisplayedDescription(clan.description);
                  gsap.to(`#card-${clan.id}`, { scale: 1.05, duration: 0.3 });
                }
              }}
              onMouseLeave={() => {
                if (hoveredIndex !== null) {
                  setHoveredIndex(null);
                  if (activeIndex !== null) {
                    const active = cardData[activeIndex];
                    setAvatarImage(active.hoverImage);
                    setDisplayedTitle(active.title);
                    setDisplayedDescription(active.description);
                  }
                  gsap.to(`#card-${clan.id}`, {
                    scale: 1,
                    boxShadow: 'none',
                    duration: 0.3,
                  });
                }
              }}
              className={clsx(
                'group relative cursor-pointer transition-all duration-500',
                'h-[280px] w-[158px] md:h-[200px] md:w-[100px] lg:h-[300px] lg:w-[150px] xl:h-[400px] xl:w-[220px]',
                activeIndex === index ? 'scale-105' : 'scale-100'
              )}
              id={`card-${clan.id}`}
            >
              {/* Background glow div */}
              <div
                className='absolute inset-0 rounded-xl transition-all duration-500'
                style={{
                  clipPath:
                    'polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)',
                  backgroundColor:
                    activeIndex === index || hoveredIndex === index
                      ? clan.glowColor
                      : 'white',
                }}
              ></div>

              {/* Image container */}
              <div
                className='absolute inset-[4px] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-white'
                style={{
                  clipPath:
                    'polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)',
                  backgroundImage: `url(${clan.image})`,
                  transition: 'background-image 0.4s ease',
                }}
              ></div>

              {/* Title positioned outside at bottom */}
              <h3
                className={clsx(
                  'absolute w-full text-center font-bold text-white',
                  'bottom-[-40px] md:bottom-[-30px] lg:bottom-[-40px] xl:bottom-[-50px]',
                  'lg:text-xl'
                )}
                style={{
                  textShadow:
                    '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8)',
                }}
              >
                {clan.title}
              </h3>

              {/* Join Clan button */}
              <div
                className={clsx(
                  'absolute left-0 flex w-full justify-center transition-opacity duration-300',
                  'bottom-[-80px] md:bottom-[-60px] lg:bottom-[-80px] xl:bottom-[-120px]',
                  activeIndex === index ? 'opacity-100' : 'opacity-0'
                )}
              >
                <button
                  onClick={() => handleJoinClan(clan.id)}
                  className='group relative z-10 min-h-[40px] w-full cursor-pointer transition-transform hover:scale-105 active:scale-95 md:h-[20px] md:w-[100px] lg:h-[30px] lg:w-[150px] xl:h-[60px] xl:w-[220px]'
                >
                  <StartButtonBorder />
                  <span className='absolute inset-0 z-10 flex items-center justify-center text-base font-semibold tracking-wide text-white sm:text-lg md:text-xs lg:text-sm xl:text-xl'>
                    Join Clan
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Animate selected character */}
        <AnimatePresence mode='wait'>
          {avatarImage && (
            <motion.div
              key={avatarImage}
              className='absolute right-0 bottom-0 z-0'
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Image
                src={avatarImage}
                height={385}
                width={385}
                className='h-[95vh] w-auto object-contain'
                alt='Clan avatar'
                draggable={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className='absolute inset-0 bg-black/50 backdrop-blur-xs'
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              className='relative z-10 mx-4 w-full max-w-md rounded-lg border border-white/10 bg-black p-6 text-white'
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className='mb-4 text-center text-xl font-bold'>
                Clan Confirmation
              </h3>
              <div className='mb-6 text-center'>
                <p className='mb-4'>Are you sure you want to choose</p>
                <p
                  className='text-xl font-bold'
                  style={{ color: selectedCard?.glowColor }}
                >
                  {selectedCard?.title}
                </p>
                <p className='font-display mt-2 font-semibold'>
                  {selectedCard?.description}
                </p>
              </div>
              <div className='flex justify-center gap-4'>
                <Button
                  ButtonText='Yes'
                  onClick={handleConfirmJoin}
                  width={130}
                  height={40}
                  className='custom-button'
                />
                <Button
                  ButtonText='No'
                  onClick={() => setModalOpen(false)}
                  width={130}
                  height={40}
                  className='custom-button bg-red-500 hover:bg-red-600'
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && <Loader message='Loading Clans Please wait...' />}
    </section>
  );
};

export default SelectClan;
