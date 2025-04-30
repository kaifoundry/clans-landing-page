import Image from "next/image";
import Button from "@/components/Button";
import ClanLogo from "@/components/ClanLogo";
import Link from "next/link";

const StartRoaringPage = () => {
  return (
    <section className="w-full overflow-y-hidden flex items-center justify-center px-6 py-12 bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center relative ">
      <span className="absolute top-0 left-5">
        <ClanLogo />
      </span>
      <h2 className="text-3xl md:text-4xl text-center absolute lg:top-20 md:top-30 text-white font-semibold">
        Introducing Roar Points
      </h2>

      {/* center card */}
      <div className="drop-shadow-[10px_10px_5px_rgba(255,255,255,1)] w-fit flex items-center justify-center flex-col mt-40">
        <div
          className="max-w-4xl md:w-[450px] md:h-[400px] lg:w-[958px] lg:h-[552px] px-10 py-8 rounded
  relative bg-gradient-to-br from-black via-black/80 to-transparent flex flex-col lg:gap-12 md:gap-5  "
          style={{
            overflow: "hidden",
            clipPath:
              "polygon(2% 8%, 2% 85%, 10% 98%, 96% 98%, 98% 95%, 98% 18%, 90% 3%, 4% 3%, 2% 8%)",
          }}
        >
          <p className="text-center xl:text-[28px]  md:text-lg xl:mt-16 lg:mt-15 text-white ">
            In the age of myth,
            <br />
            Warriors chose their clan.
          </p>
          <p className="text-center lg:text-lg 2xl:mt-12 2xl:text-[20px] md:text-sm xl:text-lg leading-10 text-color ">
            In the age of Twitter, they choose again,
            <br />
            <span className="font-bold">Post.Engage.Earn Roar Points.</span>
            <br />
            Only those who join the waitlist will get
            <br />
            early access to the battlegrounds.
            <br />
            which will clan will you fight for?
          </p>
          <Image
            src="/Images/startRoaring/Avtar1.png"
            alt="avtar 1"
            width={200}
            height={200}
            className="absolute bottom-0 right-0 2xl:h-[450px] lg:w-[280px] md:w-[150px] "
          />
        </div>
        <div className="w-full my-20 ">
          <Link
            href="/introducingClans"
            prefetch
            className="absolute lg:right-4 md:right-2"
          >
                            <button
  
  className="group cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 text-white"
>
  <div
    className="relative w-[160px] h-[45px] sm:w-[200px] sm:h-[55px] md:w-[240px] md:h-[65px] lg:w-[280px] lg:h-[75px] xl:w-[307px] xl:h-[80px]"
  >
    {/* Inline SVG */}
    <svg
      viewBox="0 0 309 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 w-full h-full transition-colors duration-300"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
        className="fill-[#0E0E17] group-hover:fill-pink-500 opacity-50"
        fillOpacity="0.8"
      />
      <path
        d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
        stroke="white"
        strokeOpacity="0.24"
        strokeWidth="2"
      />
    </svg>

    {/* Button text */}
    <span
      className="absolute inset-0 w-full h-full flex items-center justify-center text-white z-10 
                 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium"
    >
    Start Now
    </span>
  </div>
</button>
          </Link>
        </div>
      </div>

      <Image
        src="/Images/startRoaring/Avtar2.png"
        height={500}
        width={500}
        alt="avtar 2"
        className="absolute  2xl:left-20 xl:left-10 md:bottom-0 z-10 md:w-[300px] md:h-[400px] xl:w-[500px] xl:h-[600px] lg:w-[400px] lg:h-[500px] md:left-0"
      />
    </section>
  );
};

export default StartRoaringPage;
