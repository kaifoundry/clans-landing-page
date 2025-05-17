import Image from 'next/image';

const ClanLogo = () => {
  return (
    <div className='xs:w-20 xs:h-8 relative flex h-6 w-16 items-center justify-center sm:h-10 sm:w-28 md:h-12 md:w-36 lg:h-14 lg:w-44 xl:h-16 xl:w-52 2xl:h-20 2xl:w-60'>
      <div className='relative h-full w-1/4'>
        <Image
          src='/Images/gettingStarted/Object.png'
          alt='Object1'
          fill
          className='object-contain'
          sizes='(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw'
          draggable={false}
        />
      </div>
      <div className='relative mx-0 h-[70%] w-1/12'>
        <Image
          src='/Images/gettingStarted/Line.png'
          alt='Line1'
          fill
          className='object-contain'
          sizes='(max-width: 640px) 5vw, (max-width: 1024px) 3vw, 2vw'
          draggable={false}
        />
      </div>
      <div className='relative h-full w-2/4'>
        <Image
          src='/Images/gettingStarted/Clans.png'
          alt='Clans'
          fill
          className='object-contain'
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw'
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ClanLogo;
