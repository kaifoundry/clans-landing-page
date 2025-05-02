"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useClan } from "@/context/ClanContext";
import { postTweet } from "@/lib/api"; // Make sure this function returns a response or throws an error

export default function CardPage() {
  const { selectedCardId } = useClan();
  const [card, setCard] = useState<null | {
    id: string;
    title: string;
    description: string;
    image: string;
    glowColor: string;
  }>(null);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const cardData = [
    {
      id: "24c467df-c8dd-4115-87ac-e22fcdcb55aa",
      image: "/Images/selectClan/cardImg1.png",
      title: "Clan McBuilder",
      description: "We create the future with passion and code.",
      glowColor: "rgba(255, 0, 0, 0.5)",
    },
    {
      id: "5e14624b-f312-4472-a7b7-5c631925ff79",
      image: "/Images/selectClan/cardImg2.png",
      title: "McHODLer",
      description: "Diamond hands forever.",
      glowColor: "rgba(128, 0, 128, 0.5)",
    },
    {
      id: "6646714b-7aa2-4309-8aea-4b120f9719c3",
      image: "/Images/selectClan/cardImg3.png",
      title: "Clan McDegen",
      description: "Risk is our middle name.",
      glowColor: "rgba(0, 255, 0, 0.5)",
    },
    {
      id: "1bf650c9-c84d-4dc4-b3b2-31929963e4e1",
      image: "/Images/selectClan/cardImg4.png",
      title: "Clan McPrivacy",
      description: "Privacy is our birthright.",
      glowColor: "rgba(0, 0, 255, 0.5)",
    },
  ];

  const [userData, setUserdata] = useState<null | any>(null); // To store user data

  useEffect(() => {
    if (selectedCardId !== null) {
      const selected = cardData.find(
        (card) => card.id === selectedCardId.toString()
      );
      if (selected) setCard(selected);
    }
  }, [selectedCardId]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parseUserdata = JSON.parse(storedUserData);
      setUserdata(parseUserdata);
      console.log("User data from localStorage:", parseUserdata);
    }
  }, []);

  if (!card) return <div>Loading...</div>;

  const tweetContent = `Pick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened.⚔️ I've claimed my clan and started stacking my Roar Points.\nClaim your clan today!`;

  const handleStartRoaring = async () => {
    try {
      const mediaFile = new Blob(["image data here"], { type: "image/jpeg" });
      const referralCode = "your-Referral-Code";
      const userId = userData?.userId;

      const response = await postTweet(
        tweetContent,
        referralCode,
        userId,
        mediaFile
      );

      if (response?.success) {
        setStatus({ type: "success", message: "Tweet posted successfully!" });
      } else {
        setStatus({
          type: "error",
          message: "Failed to post tweet. Try again later.",
        });
      }
    } catch (error) {
      console.error("Error posting tweet:", error);
      setStatus({
        type: "error",
        message: "Something went wrong while posting the tweet.",
      });
    }
  };

  const handleRedirect = () => {
    window.location.href = "/cardPage";
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

        {status && (
          <div
            className={`mt-4 px-4 py-2 rounded-lg text-center text-white ${
              status.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10">
          <Button ButtonText="Start Roaring" onClick={handleStartRoaring} />
          <Button ButtonText="Continue" onClick={handleRedirect} />
        </div>
      </div>
    </section>
  );
}
