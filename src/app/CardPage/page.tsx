import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function CardPage() {
  return (
    <section className="main-section p-4">
      <div className=" flex flex-col items-center justify-center py-5">
        <h1 className="md:text-5xl font-bold mb-10 text-3xl">
          You are now certified{" "}
          <span className="text-purple-500">Clans Roarer!</span>
        </h1>
        <div className="bg-purple-800/30 rounded-xl backdrop-blur-2xl 2xl:w-[1370px] xl:h-[542px] xl:w-[1300px] md:w-[700px] h-[400px] w-[400px] relative">
          <div className="absolute inset-[20px] rounded-xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center">
            <div className="flex flex-col p-10 gap-y-10">
              <div className="flex flex-row  ">
                <Image
                  src="/Images/cardPage/avtar_1.png"
                  alt="userProfilePic"
                  height={100}
                  width={100}
                  className="rounded-full h-20 w-20 border-white border-2"
                />

                <div className="flex flex-col py-4 px-2">
                  <p>Yashika</p>
                  <p>yashika@gmail.com</p>
                </div>
              </div>

              <p className="">
                {" "}
                don’t tweet anymore. I Roar - with Clan McHODLer behind me.
                <br />
                Privacy is power. Roar wisely.
              </p>

              <div className="">
                <h1 className="text-purple-500 text-4xl font-semibold">
                  Clan McHODLer
                </h1>
                <p className="text-lg">“Diamond hands forever”</p>
              </div>

              <div className="flex items-center mt-10 gap-2">
                <Image
                  src="/Images/gettingStarted/Object.png"
                  width={100}
                  height={100}
                  className="w-10 h-20 object-contain"
                  alt="Object1"
                />

                <Image
                  src="/Images/gettingStarted/Clans.png"
                  width={100}
                  height={100}
                  className="w-20 h-15 object-contain"
                  alt="Clans"
                />
              </div>
            </div>
            <Image
              src="/Images/cardPage/avtar_1.png"
              alt="Avatar_1"
              width={450}
              height={300}
              className="absolute bottom-0 right-[-20] h-[250px] w-[220px] xl:w-[500px] xl:h-full"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10 ">
          <Button />
          <Link href="/JoinWaitlist" prefetch>
            <Button ButtonText="Continue" />
          </Link>
        </div>
      </div>
    </section>
  );
}
