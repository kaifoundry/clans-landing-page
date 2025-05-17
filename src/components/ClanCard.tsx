import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ClanCardProps {
  glowColor?: string;
  title: string;
  description: string;
  image?: string;
  sideImage?: string;
  userId: string;
  profilePic?: string;
  email?: string;
  username?: string;
  displayName?: string;
  cardImage?: string;
}

const ClanCard = forwardRef<HTMLDivElement, ClanCardProps>(
  (
    { title, description, sideImage, profilePic, email, username, displayName },
    ref
  ) => {
    const getColorPalette = (title: string) => {
      switch (title.toLowerCase()) {
        case 'clan mcbuilder':
          return {
            border: 'rgba(255, 69, 69, 1)',
            glow: 'rgba(255, 69, 69, 0.4)',
          };
        case 'clan mchodler':
          return {
            border: 'rgba(151, 71, 255, 1)',
            glow: 'rgba(151, 71, 255, 0.4)',
          };
        case 'clan mcdegen':
          return {
            border: 'rgba(0, 142, 31, 1)',
            glow: 'rgba(0, 142, 31, 0.4)',
          };
        case 'clan mcprivacy':
          return {
            border: 'rgba(44, 117, 242, 1)',
            glow: 'rgba(44, 117, 242, 0.4)',
          };
        default:
          return {
            border: 'rgba(128, 128, 128, 0.5)',
            glow: 'rgba(128, 128, 128, 0.5)',
          };
      }
    };

    const { border, glow } = getColorPalette(title);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='relative flex items-center justify-center rounded-3xl border-2 shadow-2xl'
        style={{
          width: '1100px',
          height: '570px',
          maxWidth: '95vw',
          maxHeight: '70vh',
          zIndex: 1,
          borderColor: border,
          backgroundImage: "url('/Images/cardPage/cardBg.png')",
        }}
      >
        <div
          className='absolute inset-0 rounded-3xl'
          style={{
            boxShadow: `0 0 40px 10px ${glow}`,
            backgroundColor: glow,
            zIndex: 2,
          }}
        />
        <div
          className='absolute inset-5 flex flex-col items-stretch justify-between rounded-2xl bg-cover bg-center md:flex-row'
          style={{
            zIndex: 3,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/Images/cardPage/cardBg.png")`,
          }}
        >
          {/* Left Side */}
          <div className='flex w-full min-w-[280px] flex-col justify-between gap-y-4 p-4 md:w-2/3 md:min-w-[320px] md:gap-y-6 md:p-8'>
            <div className='mb-4 flex items-center md:mb-0'>
              <img
                src={profilePic || '/Images/gettingStarted/user.png'}
                alt='userProfilePic'
                className='h-8 w-8 rounded-full border-2 border-white object-cover md:h-16 md:w-16'
                loading='eager'
                draggable='false'
              />
              <div className='flex flex-col px-3'>
                <p className='text-base font-semibold text-white md:text-lg'>
                  {displayName}
                </p>
                {username && (
                  <p className='text-xs font-medium text-purple-300 md:text-sm'>
                    @{username}
                  </p>
                )}
                <p className='text-xs text-gray-400 md:text-sm'>{email}</p>
              </div>
            </div>
            <div>
              <h1
                style={{ color: border }}
                className='text-2xl font-semibold md:text-5xl'
              >
                {title}
              </h1>
              <p className='text-lg font-semibold text-white/90 md:text-2xl'>
                {description}
              </p>
            </div>
            <div className='absolute bottom-4 left-4 z-10 flex items-center gap-2 md:static md:mt-4'>
              <img
                src='/Images/gettingStarted/Object.png'
                alt='Object1'
                className='h-8 w-4 object-contain md:h-16 md:w-8'
                loading='eager'
                draggable='false'
              />
              <img
                src='/Images/gettingStarted/Clans.png'
                alt='Clans'
                className='h-10 w-12 object-contain md:h-20 md:w-28'
                loading='eager'
                draggable='false'
              />
            </div>
          </div>

          {/* Right Side */}
          <div className='relative mt-4 flex w-full items-end justify-end md:mt-0'>
            {sideImage && (
              <img
                src={sideImage}
                alt='Side Image'
                className='absolute right-0 bottom-0 max-h-[95%] max-w-[430px] object-contain drop-shadow-lg'
                loading='eager'
                draggable='false'
              />
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

ClanCard.displayName = 'ClanCard';

export default ClanCard;
