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
interface SocialHandle {
  username: string;
  profilePicture: string;
  displayName: string;
}
interface TwitterPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cardRefDesktop: React.RefObject<HTMLDivElement | null>;
  cardRefMobile: React.RefObject<HTMLDivElement | null>;
  glowColor: string;
  title: string;
  description: string;
  sideImage: string;
  userId: string;
  profilePic?: string;
  displayName?: string;
  username?: string;
  followers: string;
  referralCode?: string;
  tweetContent?: string;
}

export const TwitterPostModal = React.memo(function TwitterPostModal({
  isOpen,
  onClose,
  onConfirm,
  cardRefDesktop,
  cardRefMobile,
  glowColor,
  title,
  description,
  sideImage,
  userId,
  profilePic,
  displayName,
  username,
  followers,
  referralCode,
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

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs'
      onClick={handleBackdropClick}
    >
      <div className='max-h-[90vh] w-full mx-3 mx-w-[375px] overflow-y-auto rounded-2xl border border-gray-700 bg-black sm:max-w-[370px] lg:max-w-lg xl:max-w-xl'>
        {/* Modal Header with Close Button */}
        <div className='flex items-center justify-between border-b border-gray-700 p-4 sm:p-6'>
          <h2 className='text-base font-medium text-white sm:text-lg'>
            Do you want to post the following to your twitter?
          </h2>
          <button
            onClick={onClose}
            className='p-1 text-gray-400 transition-colors hover:text-white'
            aria-label='Close modal'
          >
            <FaX className='h-5 w-5' />
          </button>
        </div>

        {/* Modal Content */}
        <div className='p-4 sm:p-6'>
          {/* Tweet Content */}
          <div className='mb-4 space-y-2 md:px-4 sm:mb-6 sm:space-y-3'>
            <p className='text-sm text-white sm:text-base'>
              Roar louder. Roar prouder. Pick your clan!
            </p>
            <p className='text-sm text-white sm:text-base'>
              <span className='text-blue-400'>@jointhecians</span> is shaping
              the attention economy for roarers.
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
              <span className='text-blue-400'>
                clans.kit.io/referral/145xxx
              </span>
            </p>
          </div>

          {/* Tweet Preview Card */}
          <div className='mx-auto mb-6 flex flex-col justify-center'>
            <div className='mx-auto hidden lg:block'>
              <PostClanCard
                glowColor={glowColor}
                title={title}
                description={description}
                sideImage={sideImage}
                profilePic={profilePic}
                displayName={displayName}
                username={username}
                followers={followers}
              />
            </div>
            <div className='mx-auto block lg:hidden'>
              <PostClanCardMobile
                glowColor={glowColor}
                title={title}
                description={description}
                sideImage={sideImage}
                profilePic={profilePic}
                displayName={displayName}
                username={username}
                followers={followers}
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className='mx-auto hidden lg:block'>
            <div className='flex  justify-between px-4 '>
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
          <div className='mx-auto block lg:hidden'>
            <div className='flex  justify-between  '>
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
      </div>
    </div>
  );
});
