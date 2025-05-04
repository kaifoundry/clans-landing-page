"use client";

import Button from "@/components/Button";
import { useEffect, useState, useRef } from "react";
import { useClan } from "@/context/ClanContext";
import { toPng } from 'html-to-image';
import ClanCard from "@/components/ClanCard";

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

  const profilePic = userData?.socialHandles?.[0]?.profilePicture;

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
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!card) return <div>Loading...</div>;

  const tweetContent = `Roar louder. Roar prouder!

Pick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened.⚔️ I've claimed my clan and started stacking my Roar Points.

Claim your clan today! ${userData?.referralCode} `;

  const handleStartRoaring = async () => {
    if (!cardRef.current || !userData?.userId) {
      setStatus({
        type: "error",
        message: "Card reference or user data not available",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      // Generate image using html-to-image
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.6,
        pixelRatio: 1,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });

      // Download the image
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `clan-card-${card.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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
      ).catch(error => {
        console.error('Upload media fetch error:', error);
        throw new Error(`Network error during media upload: ${error.message}`);
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        console.error('Upload media response error:', errorData);
        throw new Error(`Failed to upload image: ${errorData.message || uploadResponse.statusText}`);
      }

      const uploadResult = await uploadResponse.json();
      if (!uploadResult.success || !uploadResult.mediaId) {
        console.error('Upload result error:', uploadResult);
        throw new Error("Media upload failed or media ID not found in response");
      }

      // Post tweet
      const tweetData = {
        userId: userData.userId,
        text: tweetContent,
        mediaId: uploadResult.mediaId,
        referralCode: userData.referralCode || ""
      };

      console.log('Sending tweet data:', tweetData);

      const tweetResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/twitter/tweet`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tweetData),
        }
      ).catch(error => {
        console.error('Tweet fetch error:', error);
        // Don't throw error here, just log it
        return null;
      });

      if (!tweetResponse) {
        // If we got here, the tweet was likely successful but we couldn't get the response
        setStatus({
          type: "success",
          message: "Tweet posted successfully! Your Roar has been heard!",
        });
        return;
      }

      if (!tweetResponse.ok) {
        const errorData = await tweetResponse.json().catch(() => ({}));
        console.error('Tweet response error:', errorData);
        setStatus({
          type: "error",
          message: `Failed to post tweet: ${errorData.message || tweetResponse.statusText}`,
        });
        return;
      }

      // If we get here, the tweet was successful
      setStatus({
        type: "success",
        message: "Tweet posted successfully! Your Roar has been heard!",
      });

      // Optional: Add a delay before redirecting to the next page
      setTimeout(() => {
        handleRedirect();
      }, 2000);
    } catch (error: any) {
      console.error("Error in handleStartRoaring:", error);
      setStatus({
        type: "error",
        message: error.message || "Failed to complete the process",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    window.location.href = "/JoinWaitlist";
  };

  const handleDownloadCardImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#1a1a1a',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `clan-card-${card.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      setStatus({
        type: "error",
        message: "Failed to download image",
      });
    }
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />
      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-5 px-5 relative z-10">
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
          email={userData?.email}
          username={userData?.socialHandles?.[0]?.username}
        />

        {loading && (
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid border-opacity-50" />
            <p className="mt-2 text-sm text-gray-300">Processing...</p>
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
