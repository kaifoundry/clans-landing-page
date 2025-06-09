import Image from 'next/image';
import React, { forwardRef } from 'react';
import { FaUsers } from 'react-icons/fa';

interface ClanCardProps {
  glowColor: string;
  title: string;
  description: string;
  image?: string;
  sideImage?: string;
  userId: string;
  profilePic?: string;
  email?: string;
  username?: string;
  displayName?: string;
  cardCharacter?: string;
  followers?: string;
}

const ClanCardMobile = forwardRef<HTMLDivElement, ClanCardProps>(
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
    const getSafeColor = () => {
      const trimmedTitle = title.trim().toLowerCase();
      switch (trimmedTitle) {
        case 'clan mcbuilder':
          return 'rgba(255, 69, 69, 1)';
        case 'clan mchodler':
          return 'rgba(151, 71, 255, 1)';
        case 'clan mcdegen':
          return 'rgba(0, 142, 31, 1)';
        case 'clan mcprivacy':
          return 'rgba(44, 117, 242, 1)';
        default:
          return 'rgba(128, 128, 128, 0.5)';
      }
    };

    const safeGlowColor = () => {
      const trimmedTitle = title.trim().toLowerCase();
      switch (trimmedTitle) {
        case 'clan mcbuilder':
          return 'rgba(255, 69, 69, 0.8)';
        case 'clan mchodler':
          return 'rgba(151, 71, 255, 0.8)';
        case 'clan mcdegen':
          return 'rgba(0, 142, 31, 0.8)';
        case 'clan mcprivacy':
          return 'rgba(44, 117, 242,0.8)';
        default:
          return 'rgba(128, 128, 128,0.8)';
      }
    };

    const safeColorBorder = safeGlowColor();
    const getSafeBackgroundStyle = () => {
      const trimmedTitle = title.trim().toLowerCase();
      switch (trimmedTitle) {
        case 'clan mcbuilder':
          return {
            background:
              'linear-gradient(0deg, rgba(11, 11, 20, 0.4) 0%, rgba(11, 11, 20, 0.4) 100%), rgba(255, 0, 0, 1)',
            backgroundBlendMode: 'normal, color',
          };
        case 'clan mchodler':
          return {
            background:
              'linear-gradient(0deg, rgba(11, 11, 20, 0.4) 0%, rgba(11, 11, 20, 0.4) 100%), rgba(151, 71, 255, 1)',
            backgroundBlendMode: 'normal, color',
          };
        case 'clan mcprivacy':
          return {
            background:
              'linear-gradient(0deg, rgba(11, 11, 20, 0.4) 0%, rgba(11, 11, 20, 0.4) 100%), rgba(0, 0, 255,1)',
            backgroundBlendMode: 'normal, color',
          };
        case 'clan mcdegen':
          return {
            background:
              'linear-gradient(0deg, rgba(11, 11, 20, 0.4) 0%, rgba(11, 11, 20, 0.4) 100%), rgba(0, 255, 0, 0.8)',
            backgroundBlendMode: 'normal, color',
          };
        default:
          return { backgroundColor: 'rgba(128, 128, 128, 0.5)' };
      }
    };

    return (
      <div
        ref={ref}
        className="relative flex items-center justify-center rounded-3xl border-2 bg-[url('/Images/cardPage/cardBg.png')] shadow-2xl"
        style={{
          width: '320px',
          height: '360px',
          maxWidth: '95vw',
          maxHeight: '70vh',
          zIndex: 1,
          borderColor: safeColorBorder,
        }}
      >
        {/* Background image and black translucent overlay */}

        <div
          className='absolute inset-3 overflow-hidden rounded-2xl'
          style={{
            boxShadow: `0 0 40px 10px ${safeColorBorder}`,
            zIndex: 2,
            ...getSafeBackgroundStyle(),
          }}
        >
          <div
            className="absolute inset-0 bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center"
            style={{
              zIndex: 3,
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/Images/cardPage/cardBg.png")',
            }}
          />
          <div className='absolute inset-0 z-10' />
          <div className='relative z-20 flex h-full flex-col items-stretch justify-between md:flex-row'>
            {/* Left side: user info and text */}
            <div className='flex w-full min-w-[280px] flex-col justify-between gap-y-4 p-4 md:w-2/3 md:min-w-[320px] md:gap-y-6 md:p-8'>
              <div className='mb-4 flex flex-row items-center md:mb-0'>
                <img
                  src={profilePic || '/Images/gettingStarted/user.png'}
                  alt='userProfilePic'
                  height={80}
                  width={80}
                  className='z-0 h-8 w-8 rounded-full border-1 border-white/80 object-cover md:h-16 md:w-16'
                  loading='eager'
                />
                <div className='flex flex-col px-3'>
                  <p className='text-base font-semibold text-white/100 md:text-lg'>
                    {displayName}
                  </p>
                  {username && (
                    <p className='flex flex-wrap items-center justify-center gap-1 text-xs font-medium text-[#ccc] md:text-sm'>
                      @{username} |{' '}
                      <span className='flex items-center justify-center'>
                        <FaUsers className='pr-1' /> Followers: {followers}
                      </span>
                    </p>
                  )}
                  {/* <p className='text-xs text-gray-200 md:text-sm'>{followers}</p> */}
                </div>
              </div>
              <div>
                <h1
                  style={{ color: getSafeColor() }}
                  className='z-10 text-xl font-bold md:text-5xl'
                >
                  {title}
                </h1>
                <p className='relative z-10 text-[14px] font-semibold text-white/90 md:text-2xl'>
                  {description}
                </p>
              </div>
              {/* <div className='absolute bottom-4 left-4 z-10 mt-4 flex items-center gap-2 md:static md:mt-4 md:gap-2'>
                <img
                  src='/Images/gettingStarted/Object.png'
                  width={40}
                  height={80}
                  className='h-8 w-4 object-contain md:h-16 md:w-8'
                  alt='Object1'
                  loading='eager'
                />
                <img
                  src='/Images/gettingStarted/Clans.png'
                  width={80}
                  height={60}
                  className='h-10 w-12 object-contain md:h-20 md:w-28'
                  alt='Clans'
                  loading='eager'
                />
              </div> */}
              <div className='absolute bottom-4 left-4 z-10 mt-4 flex items-center gap-2 md:static md:mt-4 md:gap-2'>
                <img
                  src='/Images/gettingStarted/Object.png'
                  width={40}
                  height={80}
                  className='h-8 w-4 object-contain md:h-16 md:w-8'
                  alt='Object1'
                  loading='eager'
                />
                <img
                  src='/Images/gettingStarted/Clans.png'
                  width={80}
                  height={60}
                  className='h-10 w-12 object-contain md:h-20 md:w-28'
                  alt='Clans'
                  loading='eager'
                />
              </div>
            </div>

            {/* Right side: main image */}
            <div className='relative mt-4 flex w-full items-end justify-end md:mt-0 md:w-1/3'>
              {sideImage && (
                <img
                  src={sideImage}
                  alt='Side Image'
                  width={340}
                  height={520}
                  className='absolute -right-6 -bottom-16 h-[280px] w-[200px] object-contain drop-shadow-lg md:absolute md:-right-7 md:bottom-0 md:mx-auto md:h-[440px] md:w-[320px] xl:h-[450px] xl:w-[360px]'
                  loading='eager'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ClanCardMobile.displayName = 'ClanCardMobile';

export default ClanCardMobile;
