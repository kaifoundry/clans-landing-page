import Image from "next/image";
const ConfirmationPage = () => {
  return (
    <section className=" relative h-dvh bg-[url('/Images/gettingStarted/background.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden">
      {/* Main container */}
      <div className="mx-auto relative w-full h-full text-center flex items-center justify-center flex-col">
        {/* Logo Row */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <Image
            src="/Images/gettingStarted/Object.png"
            width={80}
            height={80}
            className="w-20 h-20 object-contain"
            alt="Object1"
          />
              <Image
                    src="/Images/gettingStarted/Line.png"
                    width={1} height={1}
                    alt="Line1"
                    className="lg:w-2 lg:h-35 md:h-20 md:w-2 object-contain"
                  />
          <Image
            src="/Images/gettingStarted/Clans.png"
            width={120}
            height={120}
            className="w-full h-[100px] object-contain"
            alt="Clans"
          />
        </div>
        
        <h1 className="text-5xl p-4 text-white font-extrabold">
          You’re officially
          <br />
          a Roarer! 🎉
        </h1>
        <p className="text-2xl text-white leading-tight">
          The Clans have heard your Roar.
          <br /> You’ll be among the 1ST to know <br />
          when the gates open.
        </p>
        <div className="flex items-center justify-center gap-6 mt-12">
          <Image src="/confirmationPage/prime_twitter.png" alt="X" width={28} height={28} />
          <Image src="/confirmationPage/vector (2).png" alt="Discord" width={28} height={28} />
          <Image src="/confirmationPage/Exclude.png" alt="Discord" width={28} height={28} />
          <Image src="/confirmationPage/lineicons_telegram.png" alt="Telegram" width={28} height={28} />
        </div>
        {/* Left Avatar */}
    
        
              <Image
                src="/Images/gettingStarted/avtar1.png"
                width={550}
                height={550}
                alt="Avatar Left"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none
                           w-[250px] sm:w-[300px] md:w-[350px] lg:w-[420px] xl:w-[480px] 2xl:w-[540px] h-auto object-contain"
              />
        
              <Image
                src="/Images/gettingStarted/avtar2_.png"
                width={580}
                height={580}
                alt="Avatar Right"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none
                           w-[250px] sm:w-[300px] md:w-[320px] lg:w-[420px] xl:w-[480px] 2xl:w-[550px] h-auto object-contain"
              />
      </div>
      {/*demo comment*/}
    </section>
  );
};
export default ConfirmationPage;