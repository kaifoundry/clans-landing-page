"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import { useClan } from "@/context/ClanContext";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import ClanLogo from "@/components/ClanLogo";
import { clansData } from "@/data/clansData";
const IntroducingClans = () => {
  const { clans, loading, error ,setSelectedCardId} = useClan();

  console.log('clans', clans);
  const router = useRouter();

  const cardRefs = useRef<HTMLDivElement[]>([]);

  

  const cardData = Array.isArray(clans) ? clans.map((clan, index) => ({
    id: clan.clanId,
    title: clan.title,
    description: clan.description,
    ...clansData[index]
  })) : [];

  if (loading) {
    return <div>Loading clans...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-25 gap-y-6 xxs:gap-6 p-8">
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
