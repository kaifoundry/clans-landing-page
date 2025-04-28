import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

const selectClan = () => {
  const cardData = [
    {
      image: "/Images/introducingClans/card_1.png",
      title: "Clan McBuilder",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "/Images/introducingClans/card_2.png",
      title: "McHODLer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "/Images/introducingClans/card_3.png",
      title: "Clan McDegen",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "/Images/introducingClans/card_4.png",
      title: "Clan McPrivacy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className="main-section p-4 overflow-hidden">
      <div className="relative w-full overflow-hidden flex justify-start flex-col gap-4 ">
        <h1 className="text-2xl text-center font-bold">Claim your Clan</h1>
        <p className="text-center">
          Long ago, clans rose from code and chaos.
          <br /> Now, they return — and they want you.
        </p>

        <div className="w-full flex gap-x-6 item-center justify-center">
          {cardData.map((card, index) => (
            <div className="relative h-[130px] w-[75px] " key={index}>
              <div
                className="bg-white absolute inset-0"
                style={{
                  clipPath:
                    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                }}
              ></div>

              <div
                className="absolute inset-[2px] text-white bg-cover bg-center bg-no-repeat flex"
                style={{
                  clipPath:
                    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                  backgroundImage: `url(${card.image})`,
                }}
              >
                <h3
                  className="text-xl font-bold mt-100 mx-auto"
                  style={{
                    textShadow:
                      "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-x-2 items-center mt-10">
          <div className="h-10 w-2 bg-pink-400"></div>
          <h2 className="text-2xl font-bold">McHODLer</h2>
        </div>
        <p className="text-xl my-2">“Diamond hands forever”</p>
        <p className="text-sm w-1/2">
          Clan Nakas: We build the blockchain and believe in holding strong for
          the future. Like diamonds, we're resilient and patient, weathering any
          storm to build lasting wealth. Join us – our strong hands hold the
          future, and we never let go!
        </p>

        <div className="w-full  flex items-center justify-center z-1">
          <Link href="/CardPage" prefetch>
            <Button ButtonText="Join Clan" width={250} height={50} />
          </Link>
        </div>
      </div>

      <Image
        src="/Images/selectClan/bgAvtar.png"
        height={280}
        width={220}
        alt="bgAvtar"
        className="absolute bottom-0 right-0  "
      />
    </section>
  );
};

export default selectClan;
