import Image from 'next/image';

const ClanLogo = () => {
  return (
    <div className='xs:w-[420px] xs:h-36 relative flex h-24 w-72 items-center justify-center sm:h-32 sm:w-96'>
      <div className='relative h-full w-full'>
        <Image
          src='/Images/gettingStarted/clansLogo.svg'
          alt='Object1'
          fill
          className='object-contain'
          sizes='(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw'
        />
      </div>
    </div>
  );
};

export default ClanLogo;
