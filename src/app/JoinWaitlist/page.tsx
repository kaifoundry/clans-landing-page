import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

const JoinWaitlist = () => {
  return (
    <section className="bg-[url('/Images/joinWaitlist/background.png')] bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col items-center justify-center p-10 gap-10">
      <div className="flex items-center mt-10 gap-2">
        <Image
          src="/Images/gettingStarted/Object.png"
          width={100}
          height={100}
          className="w-20 h-20 object-contain"
          alt="Object1"
        />

        <Image
          src="/Images/gettingStarted/Clans.png"
          width={100}
          height={100}
          className="w-30 h-15 object-contain"
          alt="Clans"
        />
      </div>

      <h1 className="md:text-5xl text-3xl font-bold">
        Early Roarers get the edge!
      </h1>

      <p className="text-center">
        Get early access, exclusive rewards, and bragging rights.
        <br />
        The battle for the timeline starts soon
      </p>
      <Link href="/ConfirmationPage" prefetch>
        <Button ButtonText="Join Waitlist" />
      </Link>
    </section>
  );
};

export default JoinWaitlist;
