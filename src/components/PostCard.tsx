import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import Image from 'next/image';

interface ClanCardProps {
  glowColor?: string;
  title: string;
  description: string;
  image?: string;
  sideImage?: string;
  profilePic?: string;
  email?: string;
  username?: string;
  displayName?: string;
  cardImage?: string;
  followers?: string;
}

const PostClanCard = forwardRef<HTMLDivElement, ClanCardProps>(
  (
    {
      title,
      description,
      sideImage,
      profilePic,
      email,
      username,
      displayName,
      followers,
    },
    ref
  ) => {
    const getColorPalette = (title: string) => {
      const trimmedTitle = title.trim().toLowerCase();

      switch (trimmedTitle) {
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
        className='relative flex w-[465px] items-center justify-center rounded-3xl border-2 shadow-2xl xl:w-[500px]'
        style={{
          // width: '465px',
          height: '300px',
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
                className='md:w-1o h-10 w-10 rounded-full border-2 border-white object-cover md:h-10'
                loading='eager'
                draggable='false'
              />
              <div className='flex flex-col px-3'>
                <p className='text-base font-semibold text-white'>
                  {displayName}
                </p>

                {username && (
                  <p className='flex items-center justify-center gap-1 text-xs font-medium text-purple-300'>
                    @{username} |{' '}
                    <span className='flex items-center justify-center'>
                      <FaUsers className='pr-1' /> Followers:{' '}
                      {isNaN(Number(followers)) ? 0 : Number(followers)}
                    </span>
                  </p>
                )}

                <p className='text-xs text-gray-400 md:text-sm'>{email}</p>
              </div>
            </div>
            <div>
              <h1
                style={{ color: border }}
                className='text-lg font-semibold md:text-xl'
              >
                {title}
              </h1>
              <p className='text-sm font-semibold text-white/90'>
                {description}
              </p>
            </div>
            <div className='absolute bottom-4 left-4 z-10 flex items-center gap-2 md:static md:mt-4'>
              <Image
                src='/Images/gettingStarted/clansLogo.svg'
                width={80}
                height={80}
                alt='Clans Logo'
                className='h-16 w-16 object-contain'
                draggable={false}
                priority
              />
            </div>
          </div>

          {/* Right Side */}
          <div className='relative mt-4 flex w-full items-end justify-end md:mt-0'>
            {sideImage && (
              <img
                src={sideImage}
                alt='Side Image'
                className='absolute right-[-4px] bottom-0 max-h-[90%] max-w-[300px] object-contain drop-shadow-lg'
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

PostClanCard.displayName = 'PostClanCard';

export default PostClanCard;
