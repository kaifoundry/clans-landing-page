import Image from "next/image";

const ClanLogo = () => {
    return (
        <div className="relative w-72 h-24 xs:w-[420px] xs:h-36 sm:w-96 sm:h-32 flex items-center justify-center">
            <div className="relative h-full w-1/4">
                <Image
                    src="/Images/gettingStarted/Object.png"
                    alt="Object1"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw"
                />
            </div>
            <div className="relative h-full w-1/12 mx-0">
                <Image
                    src="/Images/gettingStarted/Line.png"
                    alt="Line1"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 5vw, (max-width: 1024px) 3vw, 2vw"
                />
            </div>
            <div className="relative h-full w-2/5">
                <Image
                    src="/Images/gettingStarted/Clans.png"
                    alt="Clans"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
                />
            </div>
        </div>
    );
};

export default ClanLogo;