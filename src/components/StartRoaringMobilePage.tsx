import Image from 'next/image';
import Button from '@/components/Button';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReferral } from '@/context/ReferralContext';
import { useSearchParams } from 'next/navigation';
import { LuLoaderCircle } from 'react-icons/lu';
import { RefObject } from 'react';
import Head from 'next/head';

interface CommonRoaringProps {
  isModalOpen: boolean;
  isLoading: boolean;
  openModal: () => void;
  closeModal: () => void;
  callTwitterAuthAPI: () => void;
  avatarLeftRef: RefObject<HTMLImageElement | null>;
  avatarRightRef?: RefObject<HTMLImageElement | null>;
}

const StartRoaringPage = React.memo(
  ({
    isModalOpen,
    isLoading,
    openModal,
    closeModal,
    callTwitterAuthAPI,
    avatarLeftRef,
    avatarRightRef,
  }: CommonRoaringProps) => {
    const { handleReferralCode } = useReferral();
    const modalRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
      const checkAuthCallback = async () => {
        const userId = searchParams.get('userId');
        if (userId) {
          await handleReferralCode(userId);
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }
      };
      checkAuthCallback();
    }, [searchParams, handleReferralCode]);

    useEffect(() => {
      if (isModalOpen && modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
    }, [isModalOpen]);

    return (
      <>
        <Head>
          <title>Start Roaring - Join the Waitlist | Clans</title>
          <meta
            name='description'
            content='Join the waitlist for Roar Points. Post, engage, and earn rewards. Only those who join will enter the battleground!'
          />
          <meta
            property='og:title'
            content='Start Roaring - Join the Waitlist | Clans'
          />
          <meta
            property='og:description'
            content='Ancient warriors had clans. You have social media. Post. Engage. Earn Roar Points. Only those who join the waitlist will enter the battleground.'
          />
          <meta property='og:image' content='/Images/cardPage/cardVecor.png' />
        </Head>
        <main className="relative flex h-dvh w-screen flex-col justify-between overflow-hidden bg-black bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center">
          {/* Background Avatars */}
          <Image
            ref={avatarLeftRef}
            src='/Images/startRoaring/MobileAvtar1.png'
            alt='Avatar 1'
            width={400}
            height={400}
            objectFit='cover'
            className='pointer-events-none absolute bottom-0 left-0 z-0 h-[90%] w-[325px] object-cover object-center select-none sm:bottom-0 sm:h-[84%] sm:w-[310px]'
            draggable={false}
          />
          <Image
            ref={avatarRightRef}
            src='/Images/startRoaring/Avtar3.png'
            alt='Avatar 2'
            width={300}
            height={300}
            objectFit='cover'
            className='pointer-events-none absolute right-0 bottom-0 z-1 h-[94%] w-[220px] select-none sm:w-[250px]'
            draggable={false}
          />

          <section className='relative z-10 mx-auto flex min-h-dvh w-full flex-col items-center px-2'>
            <header>
              <h1 className='mt-10 mb-8 text-center text-3xl leading-tight font-semibold text-white drop-shadow-lg'>
                Introducing
                <br />
                Roar Points
              </h1>
            </header>

            {/* Center Card - vertically centered */}
            <article className='flex w-full flex-1 flex-col justify-center'>
              <section
                className='card-container relative mx-auto flex w-full max-w-[370px] flex-col gap-4 text-white'
                style={{
                  backgroundImage: "url('/Images/cardPage/cardVecor.png')",
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  marginTop: '45px',
                }}
                aria-label='Roar Points Information'
              >
                {/* Centered Content */}
                <div className='absolute inset-0 flex flex-col items-center justify-center px-2'>
                  <p className='mb-2 text-center text-lg font-normal text-white sm:text-xl'>
                    Ancient warriors had clans.
                  </p>
                  <p className='mb-2 text-center text-lg font-normal text-white sm:text-xl'>
                    You have social media.
                  </p>
                  <p className='mb-2 text-center text-lg font-semibold text-white sm:text-xl'>
                    Post. Engage. Earn Roar Points.
                  </p>
                  <p className='mb-2 text-center text-lg font-normal text-white sm:text-xl'>
                    Only those who join the waitlist
                    <br />
                    will enter the battleground.
                  </p>
                  <p className='text-center text-lg font-normal text-white sm:text-xl'>
                    Which clan will you join?
                  </p>
                </div>
              </section>
            </article>

            {/* Button */}
            <nav
              className='mb-8 flex w-full justify-center sm:mb-16'
              aria-label='Start Roaring'
            >
              <Button
                onClick={openModal}
                width={270}
                height={75}
                ButtonText='Start Roaring'
                className='w-full max-w-[260px] text-3xl text-[21px] font-semibold text-white drop-shadow-lg'
              />
            </nav>
          </section>

          {/* Modal */}
          {isModalOpen && (
            <aside
              className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50'
              aria-modal='true'
              role='dialog'
            >
              <section
                ref={modalRef}
                className='relative w-[308px] rounded-2xl bg-white p-6 text-center shadow-lg'
              >
                <div className='flex w-full items-center justify-center'>
                  <Image
                    src='/logo.svg'
                    width={100}
                    height={100}
                    className='h-20 w-24 object-contain text-xl'
                    alt='Clans Logo'
                    draggable={false}
                  />
                </div>

                <h2 className="font-['Segoe UI'] mb-4 text-2xl font-semibold text-black">
                  Clans wants to access your X account
                </h2>

                <div className='mb-4 flex flex-col gap-3'>
                  <button
                    onClick={callTwitterAuthAPI}
                    className='cursor-pointer rounded-full bg-black py-3 text-base font-bold text-white transition duration-300 hover:bg-gray-800'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className='flex items-center justify-center'>
                        <span className='pr-1'>Authenticating</span>
                        <LuLoaderCircle className='animate-spin' />
                      </span>
                    ) : (
                      'Authenticate'
                    )}
                  </button>
                </div>

                <p
                  onClick={closeModal}
                  className='mb-4 cursor-pointer text-base font-bold text-red-500'
                >
                  Cancel
                </p>

                <div className='border-t border-[#EBEBEB] pt-4 text-left'>
                  <center>
                    <h3 className='mb-2 font-bold text-[#141414]'>
                      Permission required by Clans
                    </h3>
                  </center>
                  <h3 className='mb-2 text-sm font-semibold text-[#141414]'>
                    Things this App can do...
                  </h3>
                  <ul className='list-outside list-disc space-y-1 pl-5 leading-relaxed'>
                    <li className='text-sm font-[500] text-[#525252]'>
                      Post and repost for you.
                    </li>
                  </ul>
                  <h3 className='mt-4 mb-2 text-sm font-semibold text-[#141414]'>
                    Things this App can view...
                  </h3>
                  <ul className='list-outside list-disc space-y-1 pl-5 leading-relaxed'>
                    <li className='text-sm font-[500] text-[#525252]'>
                      All the posts you can view, including posts from protected
                      accounts.
                    </li>
                  </ul>
                </div>
              </section>
            </aside>
          )}
        </main>
      </>
    );
  }
);

StartRoaringPage.displayName = 'StartRoaringPage';

export default StartRoaringPage;
