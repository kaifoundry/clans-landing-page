"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useClan } from "@/context/ClanContext";
import html2canvas from "html2canvas";

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
  const [currentStep, setCurrentStep] = useState<string>("idle");
  const cardRef = useRef<HTMLDivElement>(null);

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

  const tweetContent = `Roar louder. Roar prouder!

Pick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened.⚔️ I've claimed my clan and started stacking my Roar Points.

Claim your clan today! ${userData?.referralCode} `;

  // Step 1: Upload media to Twitter
  const uploadMedia = async (userId: string) => {
    setCurrentStep("capturing_card");

    try {
      // First capture the card as an image using html2canvas
      if (!cardRef.current) {
        throw new Error("Card component reference is not available");
      }

      console.log("📸 Capturing card component as image...");
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Higher scale for better quality
        backgroundColor: null,
        logging: true,
        useCORS: true,
      });

      setCurrentStep("uploading_media");

      // Convert canvas to base64
      const base64Data = canvas.toDataURL("image/png").split(",")[1];

      const apiUrl = `https://clans-landing.10on10studios.com/twitter/upload-media/${userId}`;

      // Create form data with the base64 image
      const formData = new FormData();
      formData.append("media", base64Data);
      formData.append(
        "fileName",
        `card-${card?.title.replace(/\s+/g, "-").toLowerCase()}.png`
      );

      console.log("📤 Uploading card image to Twitter as base64...", {
        userId,
        imageType: "card-capture",
        base64Length: base64Data.length,
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error("Failed to parse media upload response as JSON", e);
        throw new Error("Server returned an invalid response for media upload");
      }

      if (!response.ok) {
        console.error("❌ Media upload failed:", data);
        throw new Error(
          data.message || `Error ${response.status}: Media upload failed`
        );
      }

      console.log("✅ Media uploaded successfully:", data);
      return data.mediaId; // Return the mediaId for the tweet step
    } catch (error: any) {
      console.error("❌ Error uploading media:", error);
      throw error;
    }
  };

  // Step 2: Post tweet with media
  const postTweet = async (
    text: string,
    referralCode: string,
    userId: string,
    mediaId: string
  ) => {
    setCurrentStep("posting_tweet");
    const apiUrl = `https://clans-landing.10on10studios.com/twitter/tweet`;

    try {
      // Create form data for the tweet
      const formData = new FormData();
      formData.append("text", text);
      formData.append("referralCode", referralCode);
      formData.append("userId", userId);
      formData.append("mediaId", mediaId);

      console.log("🐦 Posting tweet with media...", {
        text,
        referralCode,
        userId,
        mediaId,
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error("Failed to parse tweet response as JSON", e);
        throw new Error("Server returned an invalid response for tweet");
      }

      if (!response.ok) {
        console.error("❌ Tweet posting failed:", data);
        throw new Error(
          data.message || `Error ${response.status}: Tweet posting failed`
        );
      }

      console.log("✅ Tweet posted successfully:", data);
      return data;
    } catch (error: any) {
      console.error("❌ Error posting tweet:", error);
      throw error;
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
      setLoading(true);
      setStatus(null);

      console.log("🚀 Starting the Roaring process with card capture");

      // 1. First capture card as image and upload the media
      const mediaId = await uploadMedia(userData.userId);
      console.log("✅ Received mediaId after upload:", mediaId);

      // Small delay to ensure media is processed before tweeting
      console.log("⏱️ Waiting for media processing...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 2. Then post the tweet with the media ID
      const referralCode = userData.referralCode || "default";
      const tweetResult = await postTweet(
        tweetContent,
        referralCode,
        userData.userId,
        mediaId
      );
      console.log(
        "🎉 Tweet posted successfully with full details:",
        tweetResult
      );

      setStatus({
        type: "success",
        message: "Tweet posted successfully! Your Roar has been heard!",
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Failed to post tweet. Please try again.",
      });
    } finally {
      setLoading(false);
      setCurrentStep("idle");
    }
  };

  const handleRedirect = () => {
    window.location.href = "/JoinWaitlist";
  };

  return (
    <section
      className="h-screen flex flex-col items-center justify-center bg-black p-4 overflow-hidden relative"
      style={{
        backgroundImage: "url('/Images/cardPage/cardBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for dark/blur effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />
      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-5 px-5 relative z-10">
        <h1 className="md:text-5xl font-bold mb-10 text-3xl px-10 sm:px-0 text-center">
          You are now a Certified{" "}
          <span className="text-purple-500">Clans Roarer!</span>
        </h1>

        <div
          className="rounded-3xl shadow-2xl flex items-center justify-center relative"
          ref={cardRef}
          style={{
            backgroundColor: card.glowColor,
            width: "950px",
            height: "570px",
            maxWidth: "95vw",
            maxHeight: "70vh",
            boxShadow: `0 0 40px 10px ${card.glowColor}`,
          }}
        >
          <div className="absolute inset-5 rounded-2xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center flex flex-col justify-between">
            <div className="flex flex-col p-8 gap-y-6 h-full justify-between">
              <div className="flex flex-row items-center">
                <Image
                  src={profilePic || "/Images/gettingStarted/user.png"}
                  alt="userProfilePic"
                  height={80}
                  width={80}
                  className="rounded-full h-16 w-16 border-white border-2 object-cover"
                />
                <div className="flex flex-col py-2 px-3">
                  <p className="font-semibold text-lg">{username}</p>
                  {userData?.email ? (
                    <p className="text-sm text-gray-400">{userData.email}</p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Email does not exists
                    </p>
                  )}
                </div>
              </div>

              <p className="text-base text-white/80 leading-snug">
                I don't tweet anymore. I Roar - with Clan {card.title} behind
                me.
                <br />
                Privacy is power. Roar wisely.
              </p>

              <div>
                <h1 className="text-purple-500 text-3xl font-semibold">
                  {card.title}
                </h1>
                <p className="text-lg text-white/90">{card.description}</p>
              </div>

              <div className="hidden lg:flex items-center mt-4 gap-2">
                <Image
                  src="/Images/gettingStarted/Object.png"
                  width={40}
                  height={80}
                  className="w-8 h-16 object-contain"
                  alt="Object1"
                />
                <Image
                  src="/Images/gettingStarted/Clans.png"
                  width={80}
                  height={60}
                  className="w-16 h-12 object-contain"
                  alt="Clans"
                />
              </div>
            </div>
            <Image
              src={card.image}
              alt="Card Image"
              width={180}
              height={250}
              className="absolute bottom-0 right-0 h-[220px] w-[160px] xl:w-1/4 xl:h-[80%] object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {loading && (
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid border-opacity-50" />
            <p className="mt-2 text-sm text-gray-300">
              {currentStep === "capturing_card"
                ? "Capturing your card as image..."
                : currentStep === "uploading_media"
                ? "Uploading your card to Twitter..."
                : currentStep === "posting_tweet"
                ? "Posting your Roar..."
                : "Processing..."}
            </p>
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
          <Button
            ButtonText={loading ? "Processing..." : "Start Roaring"}
            onClick={handleStartRoaring}
            className="px-2 py-1 text-xs"
            disabled={loading}
          />
          <Button
            ButtonText="Continue"
            onClick={handleRedirect}
            className="px-2 py-1 text-xs"
          />
        </div>
      </div>
    </section>
  );
}
