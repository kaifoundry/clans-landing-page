"use client";
import Image from "next/image";
import ClanLogo from "./ClanLogoMobile";

const ConfirmationPage = () => {
  return (
    // <section className="relative h-dvh overflow-hidden bg-black text-white ">
    //   <video
    //     autoPlay
    //     loop
    //     muted
    //     playsInline
    //     className="absolute top-0 left-0 w-full h-full object-cover z-0"
    //     // style={{ filter: 'grayscale(100%)' }} // Optional: uncomment for B&W video
    //   >
    //     <source src="/Videos/Main.mp4" type="video/mp4" />
    //     Your browser does not support the video tag.
    //   </video>

    //   <div className="absolute inset-0 bg-black/60 z-10"></div>

    //   <Image
    //     src="/Images/confirmationPage/mobileavtar1.png"
    //     width={300}
    //     height={400}
    //     alt="Avatar Left"
    //     className="absolute bottom-0 left-0 sm:-left-3 lg:left-0 w-[250px] h-auto md:w-[250px] z-20 pointer-events-none "
    //   />

    //   <Image
    //     src="/Images/confirmationPage/mobileavtar2.png"
    //     width={300}
    //     height={400}
    //     alt="Avatar Right"
    //     className="absolute bottom-0 right-0 w-[265px] h-auto md:w-[250px] z-10 pointer-events-none"
    //   />

    //   <div className="relative  h-full flex flex-col items-center justify-center text-center px-4 pt-16 pb-32 z-30">
    //     <div className="flex items-center justify-center mb-8 w-64 h-24">
    //       <ClanLogo />
    //       {/* < */}
    //       {/* <Image
    //         src="/Images/gettingStarted/Object.png"
    //         width={56}
    //         height={56}
    //         alt="Clans Emblem"
    //         className="w-14 h-14"
    //       />
    //       <div className="w-px h-10 bg-gray-500 mx-3" />
    //       <Image
    //         src="/Images/gettingStarted/Clans.png"
    //         width={110}
    //         height={50}
    //         alt="Clans Logo Text"
    //         className="h-[48px] w-auto"
    //       /> */}
    //     </div>

    //     <h1 className="text-2xl  leading-tight font-semibold mb-6">
    //       You’re officially on the list! 🎉
    //     </h1>

    //     <p className="text-lg leading-normal mb-8 text-gray-300 font-semibold ">
    //       The Clans have heard your Roar.
    //       <br />
    //       <br />
    //       You’ll be among the 1ST to know <br />
    //       when the gates open.
    //     </p>

    //     <div className="flex-grow"></div>

    //     <div className="flex gap-5">
    //       <Image
    //         src="/Images/confirmationPage/twitter.png"
    //         alt="Twitter"
    //         width={28}
    //         height={28}
    //         className="w-10 h-10"
    //       />
    //       <Image
    //         src="/Images/confirmationPage/discord.png"
    //         alt="Discord"
    //         width={28}
    //         height={28}
    //         className="w-10 h-10"
    //       />
    //       <Image
    //         src="/Images/confirmationPage/whatsapp.png"
    //         alt="Whatsapp"
    //         width={28}
    //         height={28}
    //         className="w-10 h-10"
    //       />
    //       <Image
    //         src="/Images/confirmationPage/telegram.png"
    //         alt="Telegram"
    //         width={28}
    //         height={28}
    //         className="w-10 h-10"
    //       />
    //     </div>
    //   </div>
    // </section>
    <section className="relative h-dvh overflow-hidden bg-black text-white">
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

            <Image
              src="/Images/gettingStarted/background.png" // Replace with your actual overlay image path
              alt="Overlay"
              fill
              style={{ opacity: 0.33 }}
              className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none"
            />

      {/* Black overlay for darkening the whole video */}
      {/* <div className="absolute inset-0 bg-black/50 z-10"></div> */}

      {/* Fade shadow from bottom */}
      <div className="absolute bottom-0 z-40 left-0 w-full h-80 bg-gradient-to-t from-black via-black/40 to-transparent "></div>

      {/* Left avatar */}
      <Image
        src="/Images/confirmationPage/mobileavtar1.png"
        width={300}
        height={400}
        alt="Avatar Left"
        className="absolute bottom-0 left-0 sm:-left-3 lg:left-0 xxs:w-[250px] w-[200px] h-auto md:w-[250px] z-30 pointer-events-none"
      />

      {/* Right avatar */}
      <Image
        src="/Images/confirmationPage/mobileavtar2.png"
        width={300}
        height={400}
        alt="Avatar Right"
        className="absolute bottom-0 right-0 xxs:w-[265px] w-[200px] h-auto md:w-[250px] z-20 pointer-events-none"
      />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 xxs:pt-16 pt-6 xxs:pb-32 pb-16 z-40">
        <div className="flex items-center justify-center mb-8 w-64 h-24">
          <ClanLogo />
        </div>

        <h1 className="text-2xl leading-tight font-semibold xxsmb-6 mb-5">
          You’re officially on the list! 🎉
        </h1>

        <p className="text-lg leading-normal mb-8 text-gray-300 font-semibold">
          The Clans have heard your Roar.
          <br />
          <br />
          You’ll be among the 1ST to know <br />
          when the gates open.
        </p>

        <div className="flex-grow"></div>

        <div className="flex gap-5 relative z-50">
          <Image
            src="/Images/confirmationPage/twitter.svg"
            alt="Twitter"
            width={27}
            height={27}
            className="w-7 h-10"
          />
          <Image
            src="/Images/confirmationPage/discord.svg"
            alt="Discord"
            width={27}
            height={27}
            className="w-7 h-10"
          />
          <Image
            src="/Images/confirmationPage/whatsapp.svg"
            alt="Whatsapp"
            width={27}
            height={27}
            className="w-7 h-10"
          />
          <Image
            src="/Images/confirmationPage/telegram.svg"
            alt="Telegram"
            width={27}
            height={27}
            className="w-7 h-10"
          />
        </div>
      </div>
    </section>
  );
};

export default ConfirmationPage;
