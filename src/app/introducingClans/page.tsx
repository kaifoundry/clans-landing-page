"use client";

import { useEffect, useRef } from "react";
import Card from "@/components/Card";
import { useClan } from "@/context/ClanContext";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

const IntroducingClans = () => {
  const { setSelectedCardId } = useClan();
  const router = useRouter();

  const cardRefs = useRef<HTMLDivElement[]>([]);

  const cardData = [
    {
      id: "225462e8-0077-45c7-a5f5-4474f2b84166",
      image: "/Images/introducingClans/card_1.png",
      hoverImage: "/Images/introducingClans/hover1.jpg",
      title: "Clan McBuilder",
      description: "Lorem ipsum dolor sit amet...",
      glowColor: "red",
      from: { x: -200, opacity: 0 },
    },
    {
      id: "b2cb6389-65e4-4d2a-acc1-ce5b02b893a3",
      image: "/Images/introducingClans/card_2.png",
      hoverImage: "/Images/introducingClans/hover2.png",
      title: "McHODLer",
      description: "Lorem ipsum dolor sit amet...",
      glowColor: "violet",
      from: { y: -200, opacity: 0 },
    },
    {
      id: "98e347d1-b7b9-4c53-ba73-26ff6ac87052",
      image: "/Images/introducingClans/card_3.png",
      hoverImage: "/Images/introducingClans/hover3.png",
      title: "Clan McDegen",
      description: "Lorem ipsum dolor sit amet...",
      glowColor: "green",
      from: { x: 200, opacity: 0 },
    },
    {
      id: "9e37533c-164d-475b-8fb0-dc8f67ae7bec",
      image: "/Images/introducingClans/card_4.png",
      hoverImage: "/Images/introducingClans/hover4.png",
      title: "Clan McPrivacy",
      description: "Lorem ipsum dolor sit amet...",
      glowColor: "blue",
      from: { y: 200, opacity: 0 },
    },
  ];

  useEffect(() => {
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref, cardData[index].from, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
        });

        // Hover animation
        const onEnter = () => {
          gsap.to(ref, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out",
          });
        };
        const onLeave = () => {
          gsap.to(ref, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out",
          });
        };

        ref.addEventListener("mouseenter", onEnter);
        ref.addEventListener("mouseleave", onLeave);

        return () => {
          ref.removeEventListener("mouseenter", onEnter);
          ref.removeEventListener("mouseleave", onLeave);
        };
      }
    });
  }, []);

  return (
    <section className="relative main-section flex flex-col items-center gap-2 px-8 py-8 overflow-hidden">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
        Introducing Clans
      </h1>
      <p className="text-center">
        Long ago, clans rose from code and chaos.
        <br />
        Now, they return — and they want you.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-25 gap-y-6 xxs:gap-6 p-12 ">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            onClick={() => {
              setSelectedCardId(card.id.toString());
              router.push("/selectClan");
            }}
            className="cursor-pointer"
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
        Choose your <span className="text-pink-600">"CLAN"</span>
      </p>
    </section>
  );
};

export default IntroducingClans;
