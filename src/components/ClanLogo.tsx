import Image from "next/image";

const ClanLogo = () => {
  return (
    <div className="relative w-16 h-6 xs:w-20 xs:h-8 sm:w-28 sm:h-10 md:w-36 md:h-12 lg:w-44 lg:h-14 xl:w-52 xl:h-16 2xl:w-60 2xl:h-20 flex items-center justify-center">
      <div className="relative h-full w-1/4">
        <Image
          src="/Images/gettingStarted/Object.png"
          alt="Object1"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw"
          draggable={false}
        />
      </div>
      <div className="relative h-[70%] w-1/12 mx-0">
        <Image
          src="/Images/gettingStarted/Line.png"
          alt="Line1"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 5vw, (max-width: 1024px) 3vw, 2vw"
          draggable={false}
        />
      </div>
      <div className="relative h-full w-2/4">
        <Image
          src="/Images/gettingStarted/Clans.png"
          alt="Clans"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ClanLogo;
