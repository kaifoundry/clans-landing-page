import Image from "next/image";
import Button from "@/components/Button";
import ClanLogo from "@/components/ClanLogo";
import Link from "next/link";

const StartRoaringPage = () => {
  return (
    <section className="w-full overflow-y-hidden flex  flex-col  gap-y-8 items-center justify-center px-6 py-12 bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center relative min-h-screen">
      <span className="absolute top-5 left-5 ">
        <ClanLogo />
      </span>

      <div className="mb-10">
        <h2 className="text-xl lg:text-4xl xl:text-5xl md:text-4xl text-center  text-white font-semibold">
          Introducing Roar Points
        </h2>
      </div>

      {/* center card */}
      <div className="drop-shadow-[10px_10px_5px_rgba(255,255,255,1)] flex items-center justify-center flex-col  gap-6">
        <div
          className="max-w-4xl md:w-[450px] md:h-[400px] lg:w-[958px] lg:h-[500px] px-10 py-8 rounded
  relative bg-gradient-to-br from-black via-black/98 to-black/80 flex flex-col lg:gap-12 md:gap-5  "
          style={{
            overflow: "hidden",
            clipPath:
              "polygon(2% 8%, 2% 85%, 10% 98%, 96% 98%, 98% 95%, 98% 18%, 90% 3%, 4% 3%, 2% 8%)",
          }}
        >
          <div className="flex flex-col items-center justify-center  h-full">
            <p className="text-center text-xl leading-10">
              Ancient warriors had clans.
              <br /> You have social media. <br />
              <span className="font-bold">Post. Engage. Earn Roar Points.</span>
              <br /> Only those who join the waitlist
              <br /> will enter the battleground. <br />
              Which clan will you join?
            </p>
          </div>

          <Image
            src="/Images/startRoaring/Avtar1.png"
            alt="avtar 1"
            width={200}
            height={200}
            className="absolute bottom-0 right-0 2xl:h-[450px] lg:w-[280px] md:w-[150px] max-w-full "
          />
        </div>

        <div className="w-full flex justify-end mt-18 ">
          <Link href="/introducingClans" prefetch className="">
            <Button />
          </Link>
        </div>
      </div>

      <Image
        src="/Images/startRoaring/Avtar2.png"
        height={500}
        width={500}
        alt="avtar 2"
        className="absolute  2xl:left-20 xl:left-10 md:bottom-0 z-10 md:w-[300px] md:h-[400px] xl:w-[500px] xl:h-[600px] lg:w-[400px] lg:h-[500px] md:left-0 max-w-full"
      />
    </section>
  );
};

export default StartRoaringPage;
