import ClanLogo from "./ClanLogo";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

export default function MobileMainPage() {
  return (
    <>
      <section className="bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center w-full min-h-screen overflow-hidden">
        <div className="relative flex flex-col h-screen ">
          <div className="mt-20">
            <ClanLogo />
          </div>

          <div className="flex justify-between w-full absolute bottom-0 overflow-hidden h-full">
            <Image
              src="/Images/gettingStarted/avtar1.png"
              width={500}
              height={100}
              alt="avtar1"
              className="z-1 absolute bottom-0 w-[400px]"
            />
            <div className="mx-auto z-10 absolute bottom-10 w-full flex items-center justify-center">
              <Link href="/startRoaring" prefetch>
                <Button ButtonText="Get Started" />
              </Link>
            </div>

            <Image
              src="/Images/gettingStarted/char02.png"
              width={400}
              height={200}
              alt="avtar2"
              className="absolute right-2 h-[600px] w-[250px] bottom-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
