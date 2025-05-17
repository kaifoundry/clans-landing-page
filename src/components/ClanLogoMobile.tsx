import Image from "next/image";

const ClanLogo = () => {
  return (
    <div className="relative w-72 h-24 xs:w-[420px] xs:h-36 sm:w-96 sm:h-32 flex items-center justify-center">
      <div className="relative h-full w-full">
        <Image
          src="/Images/gettingStarted/clansLogo.svg"
          alt="Object1"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw"
        />
      </div>
    </div>
  );
};

export default ClanLogo;
