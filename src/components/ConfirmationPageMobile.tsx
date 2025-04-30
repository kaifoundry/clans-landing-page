"use client";
import Image from "next/image";

const ConfirmationPage = () => {
  return (
    <section className="relative h-dvh flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/Videos/Main.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-20">
        {/* Logo Row */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/Images/gettingStarted/Object.png"
            width={60}
            height={60}
            alt="Object1"
            className="w-16 h-16"
          />
          <Image
            src="/Images/gettingStarted/Clans.png"
            width={120}
            height={60}
            alt="Clans"
            className="w-[120px]"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold leading-snug mb-4">
          You’re officially <br />
          on the list! 🎉
        </h1>

        {/* Subtext */}
        <p className="text-lg leading-relaxed mb-10">
          The Clans have heard your Roar.
          <br />
          You’ll be among the 1ST to know <br />
          when the gates open.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6 mb-6 ">
          <Image
            src="/Images/confirmationPage/twitter.png"
            alt="Twitter"
            width={32}
            height={32}
          />
          <Image
            src="/Images/confirmationPage/discord.png"
            alt="Discord"
            width={32}
            height={32}
          />
          <Image
            src="/Images/confirmationPage/Exclude.png"
            alt="Whatsapp"
            width={32}
            height={32}
          />
          <Image
            src="/Images/confirmationPage/telegram.png"
            alt="Telegram"
            width={32}
            height={32}
          />
        </div>
      </div>

      {/* Bottom Avatars */}
      <Image
        src="/Images/gettingStarted/mobileavtar1.png"
        width={300}
        height={300}
        alt="Avatar Left"
        className="absolute bottom-0 left-0 w-[200px] md:w-[250px] z-10"
      />
      <Image
        src="/Images/gettingStarted/mobileavtar2.png"
        width={300}
        height={300}
        alt="Avatar Right"
        className="absolute bottom-0 right-0 w-[200px] md:w-[250px] z-10"
      />
    </section>
  );
};

export default ConfirmationPage;
