import Image from "next/image";
import Button from "@/components/Button";
import ClanLogo from "@/components/ClanLogo";
import Link from "next/link";

const StartRoaringPage = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 py-12 bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center relative">
      <span className="absolute top-0 left-5">
        <ClanLogo />
      </span>
      <h2 className="text-3xl md:text-4xl text-center absolute lg:top-20 md:top-30 ">
        Introducing Roar Points
      </h2>

      {/* center card */}
      <div className="drop-shadow-[10px_10px_5px_rgba(255,255,255,1)] w-fit flex items-center justify-center flex-col">
        <div
          className="max-w-4xl md:w-[450px] md:h-[400px] lg:w-[958px] lg:h-[552px] px-10 py-8 rounded
  relative bg-gradient-to-br from-black via-black/80 to-transparent flex flex-col lg:gap-12 md:gap-5 "
          style={{
            overflow: "hidden",
            clipPath:
              "polygon(2% 8%, 2% 85%, 10% 98%, 96% 98%, 98% 95%, 98% 18%, 90% 3%, 4% 3%, 2% 8%)",
          }}
        >
          <p className="text-center xl:text-[28px]  md:text-lg xl:mt-16 lg:mt-15 ">
            In the age of myth,
            <br />
            Warriors chose their clan.
          </p>
          <p className="text-center lg:text-lg 2xl:mt-12 2xl:text-[20px] md:text-sm xl:text-lg leading-10 text-color ">
            In the age of Twitter, they choose again,
            <br />
            <span>Post.Engage.Earn Roar Points.</span>
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
        <div className="w-full ">
          <Link
            href="/introducingClans"
            prefetch
            className="absolute lg:right-4 md:right-2"
          >
            <Button />
          </Link>
        </div>
      </div>

      <Image
        src="/Images/startRoaring/Avtar2.png"
        height={500}
        width={500}
        alt="avtar 2"
        className="absolute 2xl:left-20 xl:left-10 md:bottom-0 z-10 md:w-[300px] md:h-[400px] xl:w-[500px] xl:h-[600px] lg:w-[400px] lg:h-[500px] md:left-0"
      />
    </section>
  );
};

export default StartRoaringPage;
