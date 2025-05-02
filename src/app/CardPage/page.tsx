"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useClan } from "@/context/ClanContext";

export default function CardPage() {
  const { selectedCardId } = useClan();

  const [card, setCard] = useState<null | {
    id: number;
    title: string;
    description: string;
    image: string;
    glowColor: string;
  }>(null);

  const cardData = [
    {
      id: 1,
      image: "/Images/selectClan/cardImg1.png",
      title: "Clan McBuilder",
      description: "We create the future with passion and code.",
      glowColor: "rgba(255, 0, 0, 0.5)",
    },
    {
      id: 2,
      image: "/Images/selectClan/cardImg2.png",
      title: "McHODLer",
      description: "Diamond hands forever.",
      glowColor: "rgba(128, 0, 128, 0.5)",
    },
    {
      id: 3,
      image: "/Images/selectClan/cardImg3.png",
      title: "Clan McDegen",
      description: "Risk is our middle name.",
      glowColor: "rgba(0, 255, 0, 0.5)",
    },
    {
      id: 4,
      image: "/Images/selectClan/cardImg4.png",
      title: "Clan McPrivacy",
      description: "Privacy is our birthright.",
      glowColor: "rgba(0, 0, 255, 0.5)",
    },
  ];

  useEffect(() => {
    if (selectedCardId !== null) {
      const selected = cardData.find((card) => card.id === selectedCardId);
      if (selected) setCard(selected);
    }
  }, [selectedCardId]);

  if (!card) return <div>Loading...</div>;

  const tweetContent = `Roar louder. Roar prouder.\n\nPick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened.⚔️ I've claimed my clan and started stacking my Roar Points.\nClaim your clan today!`;

  const handleStartRoaring = () => {
    const tweetContent = `Pick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened.⚔️ I've claimed my clan and started stacking my Roar Points.

Claim your clan today!`;

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetContent
    )}&url=${encodeURIComponent(
      "https://clans-landing-page.vercel.app/share-card"
    )}`;

    window.open(tweetUrl, "_blank", "width=600,height=400");
  };

  const handleRedirect = () => {
    window.location.href = "/JoinWaitlist";
  };

  return (
    <section className="main-section p-4">
      <div className="flex flex-col items-center justify-center py-5 px-5">
        <h1 className="md:text-5xl font-bold mb-10 text-3xl">
          You are now certified{" "}
          <span className="text-purple-500">Clans Roarer!</span>
        </h1>

        <div
          className="rounded-xl opacity-70 backdrop-blur-2xl 2xl:w-[1 xl:h-[542px] xl:w-[1200px] md:w-[700px] h-[400px] w-[400px] relative"
          style={{ backgroundColor: card.glowColor }}
        >
          <div className="absolute inset-[20px] rounded-xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center">
            <div className="flex flex-col p-10 gap-y-10">
              <div className="flex flex-row">
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

              <p>
                I don’t tweet anymore. I Roar - with Clan {card.title} behind
                me.
                <br />
                Privacy is power. Roar wisely.
              </p>

              <div>
                <h1 className="text-purple-500 text-4xl font-semibold">
                  {card.title}
                </h1>
                <p className="text-lg">{card.description}</p>
              </div>

              <div className="hidden lg:flex items-center mt-10 gap-2">
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
              src={card.image}
              alt="Card Image"
              width={450}
              height={300}
              className="absolute bottom-0 right-0 h-[250px] w-[220px] xl:w-1/3 xl:h-[90%]"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10">
          <Button ButtonText="Start Roaring" onClick={handleStartRoaring} />
          <Button ButtonText="Continue" onClick={handleRedirect} />
        </div>
      </div>
    </section>
  );
}
