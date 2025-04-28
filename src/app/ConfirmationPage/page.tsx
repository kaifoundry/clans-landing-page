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
            src="/Images/gettingStarted/Clans.png"
            width={120}
            height={60}
            className="w-[120px] h-[60px] object-contain"
            alt="Clans"
          />
        </div>
        <h1 className="text-5xl p-4">
          You’re officially
          <br />
          on the list! 🎉
        </h1>
        <p className="text-3xl">
          The Clans have heard your Roar.
          <br /> You’ll be among the 1ST to know <br />
          when the gates open.
        </p>
        {/* Left Avatar */}
        <Image
          src="/Images/gettingStarted/avtar1.png"
          width={550}
          height={550}
          alt="Avatar Left"
          className="absolute bottom-0 left-0 w-[300px] md:w-[450px] lg:w-[550px] object-contain z-0"
        />
        {/* Right Avatar */}
        <Image
          src="/Images/gettingStarted/avtar2.png"
          width={580}
          height={580}
          alt="Avatar Right"
          className="absolute bottom-0 right-0 w-[300px] md:w-[450px] lg:w-[580px] object-contain z-0 "
        />
      </div>
      {/*demo comment*/}
    </section>
  );
};
export default ConfirmationPage;
