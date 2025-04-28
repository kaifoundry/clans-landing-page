import Card from "@/components/Card";
import Link from "next/link";

const IntroducingClans = () => {
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
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      <p>
        Choose your
        <Link href={"/selectClan"} prefetch>
          <span className="text-pink-600">&#34;CLAN&#34;</span>
        </Link>
      </p>
    </section>
  );
};
export default IntroducingClans;
