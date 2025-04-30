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
        <source src="/videos/Main.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-100  bg-transparent z-10" />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-20 w-full max-w-screen-2xl">
        {/* Logo Row */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Image
            src="/Images/gettingStarted/Object.png"
            width={80}
            height={80}
            alt="Object"
            className="w-12 sm:w-16 md:w-20"
          />
          <Image
            src="/Images/gettingStarted/Clans.png"
            width={140}
            height={70}
            alt="Clans"
            className="w-[120px] sm:w-[150px] md:w-[180px]"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-snug mb-4">
          You’re officially <br />
          on the list! 🎉
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed mb-10">
          The Clans have heard your Roar.
          <br />
          You’ll be among the 1ST to know <br />
          when the gates open.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6 mb-8">
          <Image
            src="/Images/confirmationPage/twitter.png"
            alt="Twitter"
            width={32}
            height={32}
            className="w-6 sm:w-8"
          />
          <Image
            src="/Images/confirmationPage/discord.png"
            alt="Discord"
            width={32}
            height={32}
            className="w-6 sm:w-8"
          />
          <Image
            src="/Images/confirmationPage/whatsapp.png"
            alt="Whatsapp"
            width={32}
            height={32}
            className="w-6 sm:w-8"
          />
          <Image
            src="/Images/confirmationPage/telegram.png"
            alt="Telegram"
            width={32}
            height={32}
            className="w-6 sm:w-8"
          />
        </div>
      </div>

      {/* Bottom Left Avatar */}
      <Image
        src="/Images/gettingStarted/avtar1.png"
        width={500}
        height={500}
        alt="Avatar Left"
        className="absolute bottom-0 left-0 w-[140px] sm:w-[200px] md:w-[280px] lg:w-[350px] xl:w-[450px] 2xl:w-[500px] object-contain z-10"
      />

      {/* Bottom Right Avatar */}
      <Image
        src="/Images/gettingStarted/avtar2_.png"
        width={500}
        height={500}
        alt="Avatar Right"
        className="absolute bottom-0 right-0 w-[140px] sm:w-[200px] md:w-[280px] lg:w-[350px] xl:w-[450px] 2xl:w-[500px] object-contain z-10"
      />
    </section>
  );
};

export default ConfirmationPage;
