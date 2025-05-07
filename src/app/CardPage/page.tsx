"use client";

import Button from "@/components/Button";
import { useEffect, useState, useRef, useMemo, Suspense } from "react";
import { useClan } from "@/context/ClanContext";
import { toPng } from "html-to-image";
import ClanCard from "@/components/ClanCard";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Features/Loader";
import { clansData } from "@/data/selectClanData";
import ClanCardMobile from "@/components/ClanCardMobile";

export default function CardPage() {
  return (
    <Suspense
      fallback={<Loader message="Loading your selected Clan please wait..." />}
    >
      <CardPageContent />
    </Suspense>
  );
}

function CardPageContent() {
  const {
    clans,
    loading: clansLoading,
    error,
    selectedCardId,
    setSelectedCardId,
    joinClan,
  } = useClan();
  const [loading, setLoading] = useState(false);
  const [tweetPosted, setTweetPosted] = useState(false);
  const [card, setCard] = useState<null | {
    id: string;
    title: string;
    description: string;
    image: string;
    sideImage: string;
    glowColor: string;
    // cardCharacter:string;
  }>(null);

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

  const cardData = useMemo(() => {
    console.log("Clans data:", clans);
    const mappedData = Array.isArray(clans)
      ? clans.map((clan, index) => ({
          id: clan.clanId,
          title: clan.title,
          description: clan.description,
          image: clan.banner || "",
          sideImage: clansData[index]?.hoverImage || "",
          glowColor: clansData[index]?.glowColor || "#6366f1",
          cardImage: clansData[index]?.cardImage || "",
          // cardCharacter: clansData[index]?.cardCharacter || "",
        }))
      : [];
    console.log("Mapped card data:", mappedData);
    return mappedData;
  }, [clans]);

  useEffect(() => {
    console.log("Selected card ID:", selectedCardId);
    console.log("Available card data:", cardData);
    
    // If we have card data but no selected card ID, try to get it from localStorage
    if (!selectedCardId && cardData.length > 0) {
      try {
        const storedCardId = localStorage.getItem('selectedCardId');
        if (storedCardId) {
          console.log("Found stored card ID in localStorage:", storedCardId);
          setSelectedCardId(storedCardId);
          return; // Exit early as the state update will trigger this effect again
        }
      } catch (err) {
        console.error('Error reading from localStorage:', err);
      }
    }
    
    if (selectedCardId !== null) {
      const selected = cardData.find(
        (card) => card.id === selectedCardId.toString()
      );
      console.log("Selected card:", selected);
      if (selected) {
        setCard(selected);
      } else {
        // If no card is found, set the first card as default
        setCard(cardData[0]);
      }
    } else if (cardData.length > 0) {
      // If no card is selected but we have card data, set the first card
      setCard(cardData[0]);
    }
  }, [selectedCardId, cardData, setSelectedCardId]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!card || !cardData.length) {
    return <Loader message="Loading your selected Clan please wait..." />;
  }

  const tweetContent = `Roar louder. Roar prouder. Pick your clan!
  @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened. ⚔️ I've claimed my clan and started stacking my Roar Points. 🪙

  Claim your clan today 👉 ${process.env.NEXT_PUBLIC_API_BASE_URL}/api/referral/redirect/${userData?.referralCode}`;

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
        `card-${card?.title?.replace(/\s+/g, "-").toLowerCase()}.png`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/twitter/tweet`,
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

      console.log('Tweet Response Status:', tweetResponse?.status);
      console.log('Tweet Response OK:', tweetResponse?.ok);
      
      if (!tweetResponse) {
        console.log('No tweet response received');
        return;
      }

      const tweetResult = await tweetResponse.json().catch((error) => {
        console.error('Error parsing tweet response:', error);
        return {};
      });

      console.log('Tweet Result:', tweetResult);

      if (!tweetResponse.ok || !tweetResult.success) {
        console.error('Tweet failed:', {
          status: tweetResponse.status,
          statusText: tweetResponse.statusText,
          result: tweetResult
        });
        toast.error(
          `Failed to post tweet: ${
            tweetResult?.message || tweetResponse.statusText
          }`
        );
        return;
      }

      // Save tweet data to localStorage
      if (tweetResult.tweetId || tweetResult.tweetData?.tweetId) {
        const tweetId = tweetResult.tweetId || tweetResult.tweetData?.tweetId;
        console.log('Tweet successful, saving data:', {
          tweetId: tweetId,
          userId: userData.userId
        });
        localStorage.setItem(
          "tweetData",
          JSON.stringify({
            tweetId: tweetId,
            userId: userData.userId,
          })
        );
        setTweetPosted(true);
        toast.success("Tweet posted successfully!");
      } else {
        console.error('Tweet response missing required data:', tweetResult);
      }
    } catch (error: any) {
      console.error("Error in handleStartRoaring:", error);
      toast.error(error.message || "Failed to complete the process");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    const tweetData = JSON.parse(localStorage.getItem("tweetData") || "{}");
    const userId = userData?.userId || "";
    const tweetId = tweetData.tweetId || "";
    window.location.href = `/JoinWaitlist/${userId}/${tweetId}`;
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
      <div className="absolute inset-0 bg-black/60  z-0" />
      <div className="flex flex-col items-center justify-center  max-w-5xl px-2 py-3 sm:px-5 sm:py-5 relative z-10 w-full mt-5">
        <h1 className="md:text-2xl text-white font-bold mb-10 text-3xl px-10 sm:px-0 text-center">
          You are now certified Clans Roarer!
        </h1>
        <div className="hidden lg:block">
          <ClanCard
            ref={cardRef}
            glowColor={card.glowColor}
            title={card.title}
            description={card.description}
            sideImage={card.sideImage}
            userId={userData?.userId || ""}
            profilePic={profilePic}
            displayName={userData?.socialHandles?.[0]?.displayName}
            username={userData?.socialHandles?.[0]?.username}
          />
        </div>
        <div className="block lg:hidden">
          <ClanCardMobile
            ref={cardRef}
            glowColor={card.glowColor}
            title={card.title}
            description={card.description}
            sideImage={card.sideImage}
            userId={userData?.userId || ""}
            profilePic={profilePic}
            displayName={userData?.socialHandles?.[0]?.displayName}
            username={userData?.socialHandles?.[0]?.username}
            // cardCharacter={card.cardCharacter}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10">
          <Button
            ButtonText={loading ? "Processing..." : "Start Roaring"}
            onClick={handleStartRoaring}
            className="px-4 py-2 text-lg"
            disabled={loading || tweetPosted}
            width={250}
            height={70}
          />
          <Button
            ButtonText="Continue"
            onClick={handleRedirect}
            className="px-4 py-2 text-lg"
            width={250}
            height={70}
            disabled={!tweetPosted}
          />
        </div>
      </div>
    </section>
  );
}

// "use client";

// import Button from "@/components/Button";
// import { useEffect, useState, useRef, useMemo, Suspense } from "react";
// import { useClan } from "@/context/ClanContext";
// import { toPng } from "html-to-image";
// import ClanCard from "@/components/ClanCard";
// import toast, { Toaster } from "react-hot-toast";
// import Loader from "@/components/Features/Loader";
// import { clansData } from "@/data/selectClanData";

// export default function CardPage() {
//   return (
//     <Suspense fallback={<Loader message="Loading your selected Clan please wait..." />}>
//       <CardPageContent />
//     </Suspense>
//   );
// }

// function CardPageContent() {
//   const { clans, loading: clansLoading, error, selectedCardId, setSelectedCardId, joinClan } = useClan();
//   const [loading, setLoading] = useState(false);
//   const [tweetPosted, setTweetPosted] = useState(false);
//   const [card, setCard] = useState<null | {
//     id: string;
//     title: string;
//     description: string;
//     image: string;
//     sideImage: string;
//     glowColor: string;
//   }>(null);

//   const cardRef = useRef<HTMLDivElement>(null);

//   const [userData, setUserData] = useState<null | {
//     userId: string;
//     displayName: string;
//     referralCode?: string;
//     socialHandles?: {
//       username: string;
//       profilePicture: string;
//       displayName: string;
//     }[];
//   }>(null);

//   const profilePic = userData?.socialHandles?.[0]?.profilePicture;

//   const cardData = useMemo(() => {
//     console.log("Clans data:", clans);
//     const mappedData = Array.isArray(clans) ? clans.map((clan, index) => ({
//       id: clan.clanId,
//       title: clan.title,
//       description: clan.description,
//       image: clan.banner || "",
//       sideImage: clansData[index]?.hoverImage || "",
//       glowColor: clansData[index]?.glowColor || "#6366f1"
//     })) : [];
//     console.log("Mapped card data:", mappedData);
//     return mappedData;
//   }, [clans]);

//   useEffect(() => {
//     console.log("Selected card ID:", selectedCardId);
//     console.log("Available card data:", cardData);
//     if (selectedCardId !== null) {
//       const selected = cardData.find(
//         (card) => card.id === selectedCardId.toString()
//       );
//       console.log("Selected card:", selected);
//       if (selected) {
//         setCard(selected);
//       } else {
//         // If no card is found, set the first card as default
//         setCard(cardData[0]);
//       }
//     } else if (cardData.length > 0) {
//       // If no card is selected but we have card data, set the first card
//       setCard(cardData[0]);
//     }
//   }, [selectedCardId, cardData]);

//   useEffect(() => {
//     const storedUserData = localStorage.getItem("userData");
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     }
//   }, []);

//   if (!card || !cardData.length) {
//     return <Loader message="Loading your selected Clan please wait..." />;
//   }

//   const tweetContent = `Roar louder. Roar prouder.

// Pick your clan! @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened. ⚔️ I've claimed my clan and started stacking my Roar Points. 🪙

// Claim your clan today 👉 ${process.env.NEXT_PUBLIC_API_BASE_URL_FRONTEND}/${userData?.referralCode}`;

//   const handleStartRoaring = async () => {
//     if (!cardRef.current || !userData?.userId) {
//       toast.error("Card reference or user data not available");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Generate image using html-to-image
//       const dataUrl = await toPng(cardRef.current, {
//         quality: 0.6,
//         pixelRatio: 1,
//         style: {
//           transform: "scale(1)",
//           transformOrigin: "top left",
//         },
//       });

//       // // Download the image
//       // const link = document.createElement("a");
//       // link.href = dataUrl;
//       // link.download = `clan-card-${card.title
//       //   .toLowerCase()
//       //   .replace(/\s+/g, "-")}.png`;
//       // document.body.appendChild(link);
//       // link.click();
//       // document.body.removeChild(link);

//       // Convert dataUrl to Blob and File for upload
//       const res = await fetch(dataUrl);
//       const blob = await res.blob();
//       const file = new File(
//         [blob],
//         `card-${card?.title?.replace(/\s+/g, "-").toLowerCase()}.png`,
//         { type: "image/png" }
//       );

//       // Upload only the image file
//       const formData = new FormData();
//       formData.append("media", file);

//       const uploadResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/twitter/upload-media/${userData.userId}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       ).catch((error) => {
//         console.error("Upload media fetch error:", error);
//         throw new Error(`Network error during media upload: ${error.message}`);
//       });

//       if (!uploadResponse.ok) {
//         const errorData = await uploadResponse.json().catch(() => ({}));
//         console.error("Upload media response error:", errorData);
//         throw new Error(
//           `Failed to upload image: ${
//             errorData.message || uploadResponse.statusText
//           }`
//         );
//       }

//       const uploadResult = await uploadResponse.json();
//       if (!uploadResult.success || !uploadResult.mediaId) {
//         console.error("Upload result error:", uploadResult);
//         throw new Error(
//           "Media upload failed or media ID not found in response"
//         );
//       }

//       // Post tweet
//       const tweetData = {
//         userId: userData.userId,
//         text: tweetContent,
//         mediaId: uploadResult.mediaId,
//         referralCode: userData.referralCode || "",
//       };

//       console.log("Sending tweet data:", tweetData);

//       const tweetResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/twitter/tweet`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(tweetData),
//         }
//       ).catch((error) => {
//         console.error("Tweet fetch error:", error);
//         toast.error(`Network error: ${error.message}`);
//         return null;
//       });

//       if (!tweetResponse) return;

//       const tweetResult = await tweetResponse.json().catch(() => ({}));

//       if (!tweetResponse.ok || !tweetResult.success) {
//         toast.error(
//           `Failed to post tweet: ${
//             tweetResult?.message || tweetResponse.statusText
//           }`
//         );
//         return;
//       }

//       // Save tweet data to localStorage
//       if (tweetResult.tweetId && tweetResult.userId) {
//         localStorage.setItem(
//           "tweetData",
//           JSON.stringify({
//             tweetId: tweetResult.tweetId,
//             userId: tweetResult.userId,
//           })
//         );
//         setTweetPosted(true);
//         toast.success("Tweet posted successfully!");
//       }
//     } catch (error: any) {
//       console.error("Error in handleStartRoaring:", error);
//       toast.error(error.message || "Failed to complete the process");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRedirect = () => {
//     const tweetData = JSON.parse(localStorage.getItem("tweetData") || "{}");
//     window.location.href = `/JoinWaitlist/${userData?.userId || ""}&${tweetData.tweetId || ""}`;
//   };

//   return (
//     <section
//       className="h-screen flex flex-col items-center justify-center bg-black p-2 sm:p-4 overflow-hidden relative"
//       style={{
//         backgroundImage: "url('/Images/cardPage/cardBg.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <Toaster position="top-center" />
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />
//       <div className="flex flex-col items-center justify-center  max-w-5xl mx-auto px-2 py-3 sm:px-5 sm:py-5 relative z-10 w-full ">
//         <h1 className="md:text-5xl font-bold mb-10 text-3xl px-10 sm:px-0 text-center">
//           You are now a Certified{" "}
//           <span className="text-purple-500">Clans Roarer!</span>
//         </h1>

//         <ClanCard
//           ref={cardRef}
//           glowColor={card.glowColor}
//           title={card.title}
//           description={card.description}
//           sideImage={card.sideImage}
//           userId={userData?.userId || ""}
//           profilePic={profilePic}
//           displayName={userData?.socialHandles?.[0]?.displayName}
//           username={userData?.socialHandles?.[0]?.username}
//         />

//         <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-10">
//           <Button
//             ButtonText={loading ? "Processing..." : "Start Roaring"}
//             onClick={handleStartRoaring}
//             className="px-2 py-1 text-xs"
//             disabled={loading || tweetPosted}
//             width={280}
//             height={60}
//           />
//           <Button
//             ButtonText="Continue"
//             onClick={handleRedirect}
//             className="px-2 py-1 text-xs"
//             width={280}
//             height={60}
//             disabled={!tweetPosted}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
