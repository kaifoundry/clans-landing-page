"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useClan } from "@/context/ClanContext";

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

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState<null | {
    userId: string;
    email: string;
    referralCode?: string;
    socialHandles?: {
      username: string;
      profilePicture: string;
    }[];
  }>(null);

  const social = userData?.socialHandles?.[0];

  const username = social?.username;
  const profilePic = social?.profilePicture;

  const cardData = [
    {
      id: "225462e8-0077-45c7-a5f5-4474f2b84166",
      image: "/Images/selectClan/cardImg1.png",
      title: "Clan McBuilder",
      description: "We create the future with passion and code.",
      glowColor: "rgba(255, 0, 0, 0.5)",
    },
    {
      id: "b2cb6389-65e4-4d2a-acc1-ce5b02b893a3",
      image: "/Images/selectClan/cardImg2.png",
      title: "McHODLer",
      description: "Diamond hands forever.",
      glowColor: "rgba(128, 0, 128, 0.5)",
    },
    {
      id: "98e347d1-b7b9-4c53-ba73-26ff6ac87052",
      image: "/Images/selectClan/cardImg3.png",
      title: "Clan McDegen",
      description: "Risk is our middle name.",
      glowColor: "rgba(0, 255, 0, 0.5)",
    },
    {
      id: "9e37533c-164d-475b-8fb0-dc8f67ae7bec",
      image: "/Images/selectClan/cardImg4.png",
      title: "Clan McPrivacy",
      description: "Privacy is our birthright.",
      glowColor: "rgba(0, 0, 255, 0.5)",
    },
  ];

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
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      console.log("User data from localStorage:", parsedUserData);
    }
  }, []);

  if (!card) return <div>Loading...</div>;

  // const tweetContent = `Pick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened.⚔️ I've claimed my clan and started stacking my Roar Points.\nClaim your clan today! `;
  const tweetContent = `Roar louder. Roar prouder!

Pick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened.⚔️ I've claimed my clan and started stacking my Roar Points.

Claim your clan today! ${userData?.referralCode} `;

  const postTweet = async (
    text: string,
    referralCode: string,
    userId: string,
    media: string
  ) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/twitter/Post-tweet`;

    try {
      setLoading(true);

      // Instead of sending the full image blob, just send the image path/URL
      const formData = new FormData();
      formData.append("text", text);
      formData.append("referralCode", referralCode);
      formData.append("userId", userId);
      formData.append("media", media); // Send image URL instead of blob

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error("Failed to parse response as JSON", e);
        data = { message: "Server returned an invalid response" };
      }

      if (!response.ok) {
        console.error("❌ Backend responded with error:", data);
        setStatus({
          type: "error",
          message:
            data.message ||
            `Error ${response.status}: Request too large or server error`,
        });
        throw new Error(
          data.message ||
            `Error ${response.status}: Request too large or server error`
        );
      }

      console.log("✅ Tweet posted successfully:", data);
      setStatus({
        type: "success",
        message: "Tweet posted successfully! Your Roar has been heard!",
      });
      return data;
    } catch (error: any) {
      console.error("❌ Error posting tweet:", error);
      setStatus({
        type: "error",
        message: error.message || "Failed to post tweet. Please try again.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleStartRoaring = async () => {
    if (!userData || !userData.userId) {
      setStatus({
        type: "error",
        message: "User data not found. Please log in again.",
      });
      return;
    }

    try {
      // Use the card image path from the selected card
      const referralCode = userData.referralCode || "default";
      await postTweet(tweetContent, referralCode, userData.userId, card.image);
    } catch (error) {
      // Error is already handled in the postTweet function
      console.error("Error in handleStartRoaring:", error);
    }
  };

  const handleRedirect = () => {
    window.location.href = "/cardPage";
  };

  return (
    <section className="main-section p-4">
      <div className="flex flex-col items-center justify-center py-5 px-5">
        <h1 className="md:text-5xl font-bold mb-10 text-3xl px-10 sm:px-0">
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
                  src={profilePic || "/Images/gettingStarted/user.png"}
                  alt="userProfilePic"
                  height={100}
                  width={100}
                  className="rounded-full h-20 w-20 border-white border-2"
                />
                <div className="flex flex-col py-4 px-2">
                  <p>{username}</p>

                  {userData?.email ? (
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Email does not exists
                    </p>
                  )}
                </div>
              </div>

              <p>
                I don't tweet anymore. I Roar - with Clan {card.title} behind
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

        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid border-opacity-50" />
          </div>
        )}

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
