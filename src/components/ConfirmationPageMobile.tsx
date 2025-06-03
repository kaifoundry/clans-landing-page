'use client';
import Image from 'next/image';
import ClanLogo from './ClanLogoMobile';

interface ConfirmationPageMobileProps {
  firstLine?: string | null;
  secondLine?: string | null;
  //share functions
  handleTwitterShare: () => void;
  handleDiscordShare: () => void;
  handleWhatsAppShare: () => void;
  handleTelegramShare: () => void;
}

const ConfirmationPageMobile = ({
  firstLine,
  secondLine,
  //share functions
  handleTwitterShare,
  handleDiscordShare,
  handleWhatsAppShare,
  handleTelegramShare,
}: ConfirmationPageMobileProps) => {
  return (
    <section className='relative h-dvh overflow-hidden bg-black text-white'>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute top-0 left-0 z-0 h-full w-full object-cover'
      >
        <source src='/Videos/Main.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <Image
        src='/Images/gettingStarted/background.png'
        alt='Overlay'
        fill
        style={{ opacity: 0.33 }}
        className='pointer-events-none absolute top-0 left-0 z-10 h-full w-full object-cover'
      />

      {/* Fade shadow from bottom */}
      <div className='absolute bottom-0 left-0 z-40 h-80 w-full bg-gradient-to-t from-black via-black/40 to-transparent'></div>

      {/* Left avatar */}
      <Image
        src='/Images/confirmationPage/mobileavtar1.png'
        width={300}
        height={400}
        alt='Avatar Left'
        className='xxs:w-[250px] pointer-events-none absolute bottom-0 left-0 z-30 h-auto w-[200px] sm:-left-3 md:w-[250px] lg:left-0'
      />

      {/* Right avatar */}
      <Image
        src='/Images/confirmationPage/mobileavtar2.png'
        width={300}
        height={400}
        alt='Avatar Right'
        className='xxs:w-[265px] pointer-events-none absolute right-0 bottom-0 z-20 h-auto w-[200px] md:w-[250px]'
      />

      <div className='xxs:pt-16 xxs:pb-32 relative z-40 flex h-full flex-col items-center justify-center px-4 pt-6 pb-16 text-center'>
        <div className='mb-8 flex h-24 w-64 items-center justify-center'>
          <ClanLogo />
        </div>

        <h1 className='xxsmb-6 mb-5 text-2xl leading-tight font-semibold'>
          {firstLine}
          <br />
          {secondLine}
        </h1>

        <p className='mb-8 text-lg leading-normal font-semibold text-gray-300'>
          The Clans have heard your Roar.
          <br />
          <br />
          You’ll be among the 1st to know <br />
          when the gates open.
        </p>

        <div className='flex-grow'></div>

        <div className='relative z-50 flex gap-5'>
          <button
            onClick={handleTwitterShare}
            aria-label='Share on Twitter'
            className='focus:outline-none'
          >
            <Image
              src='/Images/confirmationPage/twitter.svg'
              alt='Twitter'
              width={27}
              height={27}
              className='h-10 w-7 cursor-pointer'
            />
          </button>

          {/* <button
            onClick={handleDiscordShare}
            aria-label='Share on Discord'
            className='focus:outline-none'
          >
            <Image
              src='/Images/confirmationPage/discord.svg'
              alt='Discord'
              width={27}
              height={27}
              className='h-10 w-7 cursor-pointer'
            />
          </button> */}

          <button
            onClick={handleWhatsAppShare}
            aria-label='Share on WhatsApp'
            className='focus:outline-none'
          >
            <Image
              src='/Images/confirmationPage/whatsapp.svg'
              alt='Whatsapp'
              width={27}
              height={27}
              className='h-10 w-7 cursor-pointer'
            />
          </button>

          <button
            onClick={handleTelegramShare}
            aria-label='Share on Telegram'
            className='focus:outline-none'
          >
            <Image
              src='/Images/confirmationPage/telegram.svg'
              alt='Telegram'
              width={27}
              height={27}
              className='h-10 w-7 cursor-pointer'
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationPageMobile;
