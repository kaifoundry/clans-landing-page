"use client";

import Button from "@/components/Button";
import { useEffect, useState, useRef } from "react";
import { useClan } from "@/context/ClanContext";
import { toPng } from "html-to-image";
import ClanCard from "@/components/ClanCard";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Features/Loader";
import { cardData } from "@/data/cardPage_Data";

export default function CardPage() {
  const { selectedCardId } = useClan();
  const [card, setCard] = useState<null | {
    id: string;
    title: string;
    description: string;
    image: string;
    glowColor: string;
  }>(null);

  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState<null | {
    userId: string;
    displayName: string;
    referralCode?: string;
    socialHandles?: {
      username: string;
      profilePicture: string;
      displayName: string;
    }[];
  }>(null);

  const profilePic = userData?.socialHandles?.[0]?.profilePicture;

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
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!card)
    return <Loader message="Loading your selected Clan please wait..." />;

  const tweetContent = `Roar louder. Roar prouder.

Pick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened. ⚔️ I've claimed my clan and started stacking my Roar Points. 🪙

Claim your clan today 👉 ${process.env.NEXT_PUBLIC_API_BASE_URL_FRONTEND}/${userData?.referralCode}`;

  const handleStartRoaring = async () => {
    if (!cardRef.current || !userData?.userId) {
      toast.error("Card reference or user data not available");
      return;
    }

    try {
      setLoading(true);

      // Generate image using html-to-image
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.6,
        pixelRatio: 1,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      });

      // // Download the image
      // const link = document.createElement("a");
      // link.href = dataUrl;
      // link.download = `clan-card-${card.title
      //   .toLowerCase()
      //   .replace(/\s+/g, "-")}.png`;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      // Convert dataUrl to Blob and File for upload
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File(
        [blob],
        `card-${card.title.replace(/\s+/g, "-").toLowerCase()}.png`,
        { type: "image/png" }
      );

      // Upload only the image file
      const formData = new FormData();
      formData.append("media", file);

      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/twitter/upload-media/${userData.userId}`,
        {
          method: "POST",
          body: formData,
        }
      ).catch((error) => {
        console.error("Upload media fetch error:", error);
        throw new Error(`Network error during media upload: ${error.message}`);
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        console.error("Upload media response error:", errorData);
        throw new Error(
          `Failed to upload image: ${
            errorData.message || uploadResponse.statusText
          }`
        );
      }

      const uploadResult = await uploadResponse.json();
      if (!uploadResult.success || !uploadResult.mediaId) {
        console.error("Upload result error:", uploadResult);
        throw new Error(
          "Media upload failed or media ID not found in response"
        );
      }

      // Post tweet
      const tweetData = {
        userId: userData.userId,
        text: tweetContent,
        mediaId: uploadResult.mediaId,
        referralCode: userData.referralCode || "",
      };

      console.log("Sending tweet data:", tweetData);

      const tweetResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/twitter/tweet?noRedirect=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tweetData),
        }
      ).catch((error) => {
        console.error("Tweet fetch error:", error);
        toast.error(`Network error: ${error.message}`);
        return null;
      });

      if (!tweetResponse) return;

      const tweetResult = await tweetResponse.json().catch(() => ({}));

      if (!tweetResponse.ok || !tweetResult.success) {
        toast.error(
          `Failed to post tweet: ${
            tweetResult?.message || tweetResponse.statusText
          }`
        );
        return;
      }

      // Save tweet data to localStorage
      if (tweetResult.tweetId && tweetResult.userId) {
        localStorage.setItem(
          "tweetData",
          JSON.stringify({
            tweetId: tweetResult.tweetId,
            userId: tweetResult.userId,
          })
        );
      }

      // Success: use redirectUrl from response
      toast.success("Tweet posted successfully! Redirecting...");

      setTimeout(() => {
        if (tweetResult.redirectUrl) {
          window.location.href = tweetResult.redirectUrl;
        } else {
          handleRedirect();
        }
      }, 2000);
    } catch (error: any) {
      console.error("Error in handleStartRoaring:", error);
      toast.error(error.message || "Failed to complete the process");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    window.location.href = "/JoinWaitlist";
  };

  return (
    <section
      className="h-screen flex flex-col items-center justify-center bg-black p-2 sm:p-4 overflow-hidden relative"
      style={{
        backgroundImage: "url('/Images/cardPage/cardBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toaster position="top-center" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />
      <div className="flex flex-col items-center justify-center  max-w-5xl mx-auto px-2 py-3 sm:px-5 sm:py-5 relative z-10 w-full ">
        <h1 className="md:text-5xl font-bold mb-10 text-3xl px-10 sm:px-0 text-center">
          You are now a Certified{" "}
          <span className="text-purple-500">Clans Roarer!</span>
        </h1>

        <ClanCard
          ref={cardRef}
          glowColor={card.glowColor}
          title={card.title}
          description={card.description}
          image={card.image}
          userId={userData?.userId || ""}
          profilePic={profilePic}
          displayName={userData?.socialHandles?.[0]?.displayName}
          username={userData?.socialHandles?.[0]?.username}
        />

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10">
          <Button
            ButtonText={loading ? "Processing..." : "Start Roaring"}
            onClick={handleStartRoaring}
            className="px-2 py-1 text-xs"
            disabled={loading}
            width={280}
            height={60}
          />
          <Button
            ButtonText="Continue"
            onClick={handleRedirect}
            className="px-2 py-1 text-xs"
            width={280}
            height={60}
          />
        </div>
      </div>
    </section>
  );
}
