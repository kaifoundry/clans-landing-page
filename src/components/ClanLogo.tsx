import Image from "next/image";

const ClanLogo = () => {
    return(
        <div className="w-full h-full flex  py-4 px-8 items-center justify-center">
            <Image
                src="/Images/gettingStarted/Object.png"
                width={100}
                height={100}
                className="w-25 h-24 object-contain"
                alt="Object1"
            />
            <Image
                src="/Images/gettingStarted/Line.png"
                width={1}
                height={1}
                className="w-1 h-15 object-contain mx-3"
                alt="Line1"
            />
            <Image
                src="/Images/gettingStarted/Clans.png"
                width={100}
                height={100}
                className="w-50 h-20 object-contain"
                alt="Clans"
            />
        </div>
    )
}

export default ClanLogo;