"use client";

import Card from "@/components/Card";
import Link from "next/link";
import { useClan } from "@/context/ClanContext";
import { useRouter } from "next/navigation";

const IntroducingClans = () => {
  const { setSelectedCardId } = useClan();
  const router = useRouter();

  const cardData = [
    {
      id: 1,
      image: "/Images/introducingClans/card_1.png",
      hoverImage: "/Images/introducingClans/hover1.jpg",
      title: "Clan McBuilder",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      glowColor: "red", // Glow color for this card
    },
    {
      id: 2,
      image: "/Images/introducingClans/card_2.png",
      hoverImage: "/Images/introducingClans/hover2.png",
      title: "McHODLer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      glowColor: "violet", // Glow color for this card
    },
    {
      id: 3,
      image: "/Images/introducingClans/card_3.png",
      hoverImage: "/Images/introducingClans/hover3.png",
      title: "Clan McDegen",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      glowColor: "green", // Glow color for this card
    },
    {
      id: 4,
      image: "/Images/introducingClans/card_4.png",
      hoverImage: "/Images/introducingClans/hover4.png",
      title: "Clan McPrivacy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      glowColor: "blue", // Glow color for this card
    },
  ];

  return (
    <section className="relative main-section flex flex-col items-center gap-5  px-5 overflow-hidden ">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-10 ">
        Introducing Clans
      </h1>
      <p className="text-center">
        Long ago, clans rose from code and chaos.
        <br />
        Now, they return — and they want you.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCardId(card.id);
              router.push("/selectClan");
              console.log(card.title);
            }}
          >
            <Card
              image={card.image}
              title={card.title}
              description={card.description}
              hoverImage={card.hoverImage}
              glowColor={card.glowColor}
            />
          </div>
        ))}
      </div>

      <p>
        Choose your
        <span className="text-pink-600">&#34;CLAN&#34;</span>
      </p>
    </section>
  );
};
export default IntroducingClans;
