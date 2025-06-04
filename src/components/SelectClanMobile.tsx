'use client';

import Button from '@/components/Button';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectClanDesktopProps } from './SelectClanDesktop';
export interface SelectClanMobileProps {
  clanColor: string;
  setClanColor: React.Dispatch<React.SetStateAction<string>>;
}

export type SelectClanProps = SelectClanDesktopProps & SelectClanMobileProps;

const SelectClan: React.FC<SelectClanProps> = ({
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
  clanColor,
  setClanColor,
}) => {
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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const audio = new Audio('/sounds/click.mp3');
    audio.play();
  };
  return (
    <div className='fixed inset-0 overflow-hidden'>
      <section className='main-section h-screen overflow-hidden px-4'>
        <div className='relative flex w-full flex-col justify-start gap-y-8 overflow-hidden'>
          <h1 className='text-center text-3xl font-semibold'>
            Claim your Clan
          </h1>
          <div className='z-10'>
            <div className='flex items-center gap-x-2'>
              <div
                className='h-7 w-[2px]'
                style={{ backgroundColor: clanColor }}
              />
              <h2 className='text-[26px] font-bold'>{displayedTitle}</h2>
            </div>
            <p className='z-1 text-lg font-semibold'>{displayedDescription}</p>
          </div>
          <div className='z-10 grid w-[50%] grid-cols-2 gap-x-10 gap-y-5 p-2'>
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
                  setHoveredIndex(index);
                  setAvatarImage(clan.cardImage);
                  setDisplayedTitle(clan.title);
                  setDisplayedDescription(clan.description);
                  setClanColor(clan.glowColor);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  if (activeIndex !== null) {
                    const active = cardData[activeIndex];
                    setAvatarImage(active.cardImage);
                    setDisplayedTitle(active.title);
                    setDisplayedDescription(active.description);
                  }
                }}
                className={clsx(
                  'relative h-[145px] w-[85px] cursor-pointer',
                  activeIndex === index ? 'scale-105' : 'scale-100'
                )}
                style={{
                  filter:
                    activeIndex === index || hoveredIndex === index
                      ? `drop-shadow(0 0 1px ${clan.glowColor}) drop-shadow(0 0 6px ${clan.glowColor})`
                      : 'none',
                  transition: 'filter 0.4s ease, transform 0.4s ease',
                }}
              >
                <div
                  className='absolute inset-0 transition-all duration-500'
                  style={{
                    clipPath:
                      'polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)',
                    boxShadow:
                      activeIndex === index || hoveredIndex === index
                        ? `0 0 2px ${clan.glowColor}, 0 0 10px ${clan.glowColor}`
                        : 'none',
                    backgroundColor:
                      activeIndex === index || hoveredIndex === index
                        ? clan.glowColor
                        : 'white',
                  }}
                ></div>

                <div
                  className='absolute inset-[2px] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat text-white'
                  style={{
                    clipPath:
                      'polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)',
                    backgroundImage: `url(${clan.image})`,
                    transition: 'background-image 0.4s ease',
                  }}
                />
              </div>
            ))}
          </div>

          <div className='z-1 flex w-full items-center justify-center'>
            {selectedCard && (
              <button
                className='group z-10 cursor-pointer text-white transition-transform hover:scale-105 active:scale-95'
                onClick={(e) => {
                  handleClick(e);
                  handleJoinClan(selectedCard.id);
                }}
              >
                <div className='relative h-[75px] w-[270px]'>
                  <svg
                    viewBox='0 0 309 81'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute top-0 left-0 h-full w-full transition-colors duration-300'
                    preserveAspectRatio='xMidYMid meet'
                  >
                    <path
                      d='M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z'
                      className='fill-[#0E0E17] opacity-80 group-hover:fill-pink-500'
                      fillOpacity='0.8'
                    />
                    <path
                      d='M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5'
                      stroke='white'
                      strokeOpacity='0.24'
                      strokeWidth='2'
                    />
                  </svg>

                  <span className='absolute inset-0 z-10 flex h-full w-full items-center justify-center text-[21px] font-medium text-white sm:text-2xl md:text-2xl'>
                    Join Clan
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {avatarImage && (
            <motion.img
              key={avatarImage}
              src={avatarImage}
              alt='bgAvatar'
              className='fixed right-0 bottom-0 z-0 h-[500px] w-[250px]'
              width={250}
              height={270}
              draggable={false}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                maxHeight: '60vh',
                maxWidth: '80vw',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {modalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div
              className='absolute inset-0 bg-black/50 backdrop-blur-xs'
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              className='relative z-10 mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-black p-6'
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className='mb-4 text-center text-xl font-bold'>
                Clan Confirmation
              </h3>
              <div className='mb-6 text-center'>
                <p className='mb-4 text-sm font-semibold'>
                  Are you sure you want to choose
                </p>
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
                />
                <Button
                  ButtonText='No'
                  onClick={() => setModalOpen(false)}
                  width={130}
                  height={40}
                  className='bg-red-500 hover:bg-gray-600'
                />
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SelectClan;
