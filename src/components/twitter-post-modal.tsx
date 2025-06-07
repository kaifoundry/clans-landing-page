'use client';

import React from 'react';

import { useEffect } from 'react';
import Image from 'next/image';
import { FaX } from 'react-icons/fa6';
import Button from './Button';
import ClanCard from './ClanCard';
import ClanCardMobile from './ClanCardMobile';
import PostClanCard from './PostCard';
import PostClanCardMobile from './PostCardMobile';
import { ENV } from '@/constant/envvariables';
interface SocialHandle {
  username: string;
  profilePicture: string;
  displayName: string;
}
interface TwitterPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  glowColor: string;
  title: string;
  description: string;
  sideImage: string;
  profilePic?: string;
  displayName?: string;
  username?: string;
  followers: string;
}

export const TwitterPostModal = React.memo(function TwitterPostModal({
  isOpen,
  onClose,
  onConfirm,
  glowColor,
  title,
  description,
  sideImage,
  profilePic,
  displayName,
  username,
  followers,
}: TwitterPostModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleYes = () => {
    onConfirm();
    onClose();
  };

  const handleNo = () => {
    onClose();
  };
  const storedUserDataString = localStorage.getItem('userData');
  const storedUserData = storedUserDataString
    ? JSON.parse(storedUserDataString)
    : null;

  return (
    <div
      className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-lg xl:bg-[url(/Images/startRoaring/bgTartan.png)] xl:bg-[length:70%] xl:bg-[position:center_60%] xl:bg-no-repeat'
      onClick={handleBackdropClick}
    >
      {/* Modal Header  */}
      <div className='flex items-center justify-between sm:px-7 sm:py-10'>
        <h1 className='text-3xl font-semibold text-white'>
          Do you want to post the following to your X?
        </h1>
      </div>
      <div className='mx-w-[375px] mx-3 max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-gray-700 sm:max-w-[370px] lg:max-w-lg xl:max-w-xl'>
        {/* Modal Content */}
        <div className='p-4 sm:p-6'>
          {/* Tweet Content */}
          {/* space-y-2 sm:space-y-3 */}
          <div className='mb-4 sm:mb-6 md:px-4'>
            <p className='text-sm text-white sm:text-base'>
              Roar louder. Roar prouder. Pick your clan!
            </p>
            <p className='text-sm text-white sm:text-base'>
              <span className='text-blue-400'>{ENV.NEXT_PUBLIC_X_HANDLER}</span>{' '}
              is shaping the attention economy for roarers.
            </p>
            <div className='flex items-center gap-2'>
              <p className='text-sm text-white sm:text-base'>
                The battlegrounds have just opened.
              </p>
            </div>
            <p className='text-sm text-white sm:text-base'>
              I've claimed my clan and started stacking my Roar Points
            </p>
            <p className='text-sm break-all text-white sm:text-base sm:break-normal'>
              Claim your clan today 👉{' '}
              {`${ENV.NEXT_PUBLIC_API_BASE_URL}/referral/${storedUserData?.referralCode ?? ''}`}
            </p>
          </div>
          {/* Tweet Preview Card */}
          <div className='mx-auto mb-6 flex flex-col justify-center'>
            <div className='mx-auto hidden max-w-full lg:block'>
              <PostClanCard
                glowColor={glowColor}
                title={title}
                description={description}
                sideImage={sideImage}
                profilePic={profilePic}
                displayName={displayName}
                username={username}
                followers={followers}
                // Ensure PostClanCard uses responsive width for images inside
              />
            </div>
            <div className='mx-auto block max-w-full lg:hidden'>
              <PostClanCardMobile
                glowColor={glowColor}
                title={title}
                description={description}
                sideImage={sideImage}
                profilePic={profilePic}
                displayName={displayName}
                username={username}
                followers={followers}
                // Ensure PostClanCardMobile uses responsive width for images inside
              />
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}

      <div className='mx-auto mt-6 hidden lg:block'>
        <div className='flex gap-8'>
          <Button
            ButtonText=' No, go back'
            width={170}
            height={60}
            className='custom-button text-red-400 hover:bg-red-500'
            onClick={handleNo}
          />
          <Button
            ButtonText='Yes'
            width={170}
            height={60}
            className='custom-button'
            onClick={handleYes}
          />
        </div>
      </div>
      <div className='mx-auto mt-6 block lg:hidden'>
        <div className='flex justify-between gap-8'>
          <Button
            ButtonText=' No'
            width={100}
            height={30}
            className='custom-button text-red-400 hover:bg-red-500'
            onClick={handleNo}
          />
          <Button
            ButtonText='Yes'
            width={100}
            height={30}
            className='custom-button'
            onClick={handleYes}
          />
        </div>
      </div>
    </div>
  );
});
