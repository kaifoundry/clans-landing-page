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
import ClanLogo from "@/components/ClanLogo";

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

  const cardRefDesktop = useRef<HTMLDivElement>(null);
  const cardRefMobile = useRef<HTMLDivElement>(null);

  

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
          sideImage: clansData[index]?.selectImage || "",
          glowColor: clansData[index]?.glowColor || "#6366f1",
        }))
      : [];
    return mappedData;
  }, [clans]);

  useEffect(() => {
    // If we have card data but no selected card ID, try to get it from localStorage
    if (!selectedCardId && cardData.length > 0) {
      try {
        const storedCardId = localStorage.getItem("selectedCardId");
        if (storedCardId) {
          console.log("Found stored card ID in localStorage:", storedCardId);
          setSelectedCardId(storedCardId);
          return; // Exit early as the state update will trigger this effect again
        }
      } catch (err) {
        console.error("Error reading from localStorage:", err);
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

  Claim your clan today 👉 ${process.env.NEXT_PUBLIC_API_BASE_URLS}/referral/${userData?.referralCode}`;

  const handleStartRoaring = async () => {
    if (!cardRefDesktop.current && !cardRefMobile.current) {
      toast.error("Card reference not available");
      return;
    }

    if (!userData) {
      toast.error("User data not available");
      return;
    }

    try {
      setLoading(true);

      // Determine which ref to use based on screen size
      const isMobile = window.innerWidth < 1024;
      const cardNode = isMobile
        ? cardRefMobile.current
        : cardRefDesktop.current;
      if (!cardNode) {
        toast.error("Card reference not available");
        return;
      }
      const rect = cardNode.getBoundingClientRect();

      // const dataUrl = await toPng(cardNode, {
      //   quality: 0.8, // Balanced quality setting
      //   pixelRatio: 1.5, // Balanced pixel ratio for sharpness vs performance
      //   style: {
      //     transform: "scale(1)",
      //     transformOrigin: "top left",
      //   },
      //   backgroundColor: '#181118',
      //   width: Math.min(rect.width, 1200), // Cap maximum width
      //   height: Math.min(rect.height, 675), // Cap maximum height
      //   filter: (node) => {
      //     const className = node.className || '';
      //     return !className.includes('toast') && !className.includes('Toaster');
      //   },
      // });

      const buildPng = async () => {
        const element = document.getElementById("image-node");

        let dataUrl = "";
        const minDataLength = 2000000;
        let i = 0;
        const maxAttempts = 10;

        while (dataUrl.length < minDataLength && i < maxAttempts) {
          dataUrl = await toPng(cardNode, {
            quality: 0.8, // Balanced quality setting
            pixelRatio: 1.5, // Balanced pixel ratio for sharpness vs performance
            style: {
              transform: "scale(1)",
              transformOrigin: "top left",
            },
            backgroundColor: "#181118",
            width: Math.min(rect.width, 1200), // Cap maximum width
            height: Math.min(rect.height, 675), // Cap maximum height
            filter: (node) => {
              const className = node.className || "";
              return (
                !className.includes("toast") && !className.includes("Toaster")
              );
            },
          });
          i += 1;
        }

        return dataUrl;
      };

      const dataUrl = await buildPng();

      // const dataUrl = await toJ(cardNode, {
      //   quality: 0.8, // Balanced quality setting
      //   pixelRatio: 1.5, // Balanced pixel ratio for sharpness vs performance
      //   style: {
      //     transform: "scale(1)",
      //     transformOrigin: "top left",
      //   },
      //   backgroundColor: '#181118',
      //   width: Math.min(rect.width, 1200), // Cap maximum width
      //   height: Math.min(rect.height, 675), // Cap maximum height
      //   filter: (node) => {
      //     const className = node.className || '';
      //     return !className.includes('toast') && !className.includes('Toaster');
      //   },
      // });
      // Convert dataUrl to Blob and File for upload
      const res = await fetch(dataUrl);
      let blob = await res.blob();

      // Log the size for debugging
      console.log("Generated image size:", Math.round(blob.size / 1024), "KB");

      // Ensure the file size is within reasonable limits (1MB)
      if (blob.size > 1024 * 1024) {
        // If still too large, try with even lower quality
        const reducedDataUrl = await toPng(cardNode, {
          quality: 0.6,
          pixelRatio: 1,
          style: {
            transform: "scale(1)",
            transformOrigin: "top left",
          },
          backgroundColor: "#000000",
          width: rect.width,
          height: rect.height,
          filter: (node) => {
            const className = node.className || "";
            return (
              !className.includes("toast") && !className.includes("Toaster")
            );
          },
        });

        const reducedRes = await fetch(reducedDataUrl);
        const reducedBlob = await reducedRes.blob();
        console.log(
          "Reduced image size:",
          Math.round(reducedBlob.size / 1024),
          "KB"
        );

        if (reducedBlob.size > 1024 * 1024) {
          throw new Error("Unable to generate image within size limits");
        }

        blob = reducedBlob;
      }

      const file = new File(
        [blob],
        `card-${card?.title?.replace(/\s+/g, "-").toLowerCase()}.png`,
        { type: "image/png" }
      );

      // Upload to server
      const formData = new FormData();
      formData.append("media", file);

      console.log("Attempting to upload image...");

      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/V2/twitter/upload-media/${userData.userId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload failed with status:", uploadResponse.status);
        console.error("Error response:", errorText);
        throw new Error(
          `Failed to upload image: ${uploadResponse.status} ${errorText}`
        );
      }

      const uploadResult = await uploadResponse.json();
      console.log("Upload result:", uploadResult);

      if (!uploadResult.success || !uploadResult.mediaId) {
        console.error("Media upload failed:", uploadResult);
        throw new Error(`Media upload failed: ${JSON.stringify(uploadResult)}`);
      }

      // Post tweet
      const tweetData = {
        userId: userData.userId,
        text: tweetContent,
        mediaId: uploadResult.mediaId,
        referralCode: userData.referralCode || "",
      };

      console.log("Attempting to post tweet...");
      const tweetResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/V2/twitter/tweet`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tweetData),
        }
      );

      if (!tweetResponse.ok) {
        const errorText = await tweetResponse.text();
        console.error("Tweet failed with status:", tweetResponse.status);
        console.error("Error response:", errorText);
        throw new Error(
          `Failed to post tweet: ${tweetResponse.status} ${errorText}`
        );
      }

      const tweetResult = await tweetResponse.json();
      console.log("Tweet result:", tweetResult);

      if (!tweetResult.tweetId && !tweetResult.tweetData?.tweetId) {
        console.error("No tweet ID received:", tweetResult);
        throw new Error(`No tweet ID received: ${JSON.stringify(tweetResult)}`);
      }

      // Save tweet data
      localStorage.setItem(
        "tweetData",
        JSON.stringify({
          tweetId: tweetResult.tweetId || tweetResult.tweetData?.tweetId,
          userId: userData.userId,
        })
      );

      setTweetPosted(true);
      toast.success("Tweet posted successfully!");
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
      {/* <Toaster position="top-center" /> */}
      <div className="absolute inset-0 bg-black/60  z-0" />
      <div className="flex flex-col items-center justify-center  max-w-6xl px-2 py-3 sm:px-5 sm:py-5 relative z-10 w-full mt-5 ">
        <h1 className="md:text-4xl text-white font-bold mb-10 text-2xl sm:text-3xl px-10 sm:px-0 text-center">
          You are now certified{" "}
          <span style={{ color: card.glowColor }}>Clans Roarer</span>!
        </h1>
        <div className="hidden lg:block">
          <ClanCard
            ref={cardRefDesktop}
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
            ref={cardRefMobile}
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
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center mt-5">
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
// import ClanCardMobile from "@/components/ClanCardMobile";
// import ClanLogo from "@/components/ClanLogo";

// export default function CardPage() {
//   return (
//     <Suspense
//       fallback={<Loader message="Loading your selected Clan please wait..." />}
//     >
//       <CardPageContent />
//     </Suspense>
//   );
// }

// function CardPageContent() {
//   const {
//     clans,
//     loading: clansLoading,
//     error,
//     selectedCardId,
//     setSelectedCardId,
//     joinClan,
//   } = useClan();
//   const [loading, setLoading] = useState(false);
//   const [tweetPosted, setTweetPosted] = useState(false);
//   const [card, setCard] = useState<null | {
//     id: string;
//     title: string;
//     description: string;
//     image: string;
//     sideImage: string;
//     glowColor: string;
//     // cardCharacter:string;
//   }>(null);

//   const cardRefDesktop = useRef<HTMLDivElement>(null);
//   const cardRefMobile = useRef<HTMLDivElement>(null);

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
//     const mappedData = Array.isArray(clans)
//       ? clans.map((clan, index) => ({
//           id: clan.clanId,
//           title: clan.title,
//           description: clan.description,
//           image: clan.banner || "",
//           sideImage: clansData[index]?.selectImage || "",
//           glowColor: clansData[index]?.glowColor || "#6366f1",
//         }))
//       : [];
//     return mappedData;
//   }, [clans]);

//   useEffect(() => {
//     // If we have card data but no selected card ID, try to get it from localStorage
//     if (!selectedCardId && cardData.length > 0) {
//       try {
//         const storedCardId = localStorage.getItem('selectedCardId');
//         if (storedCardId) {
//           console.log("Found stored card ID in localStorage:", storedCardId);
//           setSelectedCardId(storedCardId);
//           return; // Exit early as the state update will trigger this effect again
//         }
//       } catch (err) {
//         console.error('Error reading from localStorage:', err);
//       }
//     }

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
//   }, [selectedCardId, cardData, setSelectedCardId]);

//   useEffect(() => {
//     const storedUserData = localStorage.getItem("userData");
//     if (storedUserData) {
//       setUserData(JSON.parse(storedUserData));
//     }
//   }, []);

//   if (!card || !cardData.length) {
//     return <Loader message="Loading your selected Clan please wait..." />;
//   }

//   const tweetContent = `Roar louder. Roar prouder. Pick your clan!
//   @CLANS is shaping the attention economy for roarers. The battlegrounds have just opened. ⚔️ I've claimed my clan and started stacking my Roar Points. 🪙

//   Claim your clan today 👉 ${process.env.NEXT_PUBLIC_API_BASE_URL_FRONTEND}/referral/${userData?.referralCode}`;

//   const handleStartRoaring = async () => {
//     if (!cardRefDesktop.current && !cardRefMobile.current) {
//       toast.error("Card reference not available");
//       return;
//     }

//     if (!userData) {
//       toast.error("User data not available");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Determine which ref to use based on screen size
//       const isMobile = window.innerWidth < 1024;
//       const cardNode = isMobile ? cardRefMobile.current : cardRefDesktop.current;
//       if (!cardNode) {
//         toast.error("Card reference not available");
//         return;
//       }
//       const rect = cardNode.getBoundingClientRect();

//       // const dataUrl = await toPng(cardNode, {
//       //   quality: 0.8, // Balanced quality setting
//       //   pixelRatio: 1.5, // Balanced pixel ratio for sharpness vs performance
//       //   style: {
//       //     transform: "scale(1)",
//       //     transformOrigin: "top left",
//       //   },
//       //   backgroundColor: '#181118',
//       //   width: Math.min(rect.width, 1200), // Cap maximum width
//       //   height: Math.min(rect.height, 675), // Cap maximum height
//       //   filter: (node) => {
//       //     const className = node.className || '';
//       //     return !className.includes('toast') && !className.includes('Toaster');
//       //   },
//       // });

//       // Convert dataUrl to Blob and File for upload

//       const buildPng = async () => {
//         const element = document.getElementById("image-node");

//         let dataUrl = "";
//         const minDataLength = 2000000;
//         let i = 0;
//         const maxAttempts = 10;

//         while (dataUrl.length < minDataLength && i < maxAttempts) {
//           dataUrl = await toPng(cardNode, {
//             quality: 0.8, // Balanced quality setting
//             pixelRatio: 1.5, // Balanced pixel ratio for sharpness vs performance
//             style: {
//               transform: "scale(1)",
//               transformOrigin: "top left",
//             },
//             backgroundColor: "#181118",
//             width: Math.min(rect.width, 1200), // Cap maximum width
//             height: Math.min(rect.height, 675), // Cap maximum height
//             filter: (node) => {
//               const className = node.className || "";
//               return (
//                 !className.includes("toast") && !className.includes("Toaster")
//               );
//             },
//           });
//           i += 1;
//         }

//         return dataUrl;
//       };

//       const dataUrl = await buildPng();

//       const res = await fetch(dataUrl);
//       let blob = await res.blob();

//       // Log the size for debugging
//       console.log("Generated image size:", Math.round(blob.size / 1024), "KB");

//       // Ensure the file size is within reasonable limits (1MB)
//       if (blob.size > 1024 * 1024) {
//         // If still too large, try with even lower quality
//         const reducedDataUrl = await toPng(cardNode, {
//           quality: 0.6,
//           pixelRatio: 1,
//           style: {
//             transform: "scale(1)",
//             transformOrigin: "top left",
//           },
//           backgroundColor: "#000000",
//           width: rect.width,
//           height: rect.height,
//           filter: (node) => {
//             const className = node.className || '';
//             return !className.includes('toast') && !className.includes('Toaster');
//           },
//         });

//         const reducedRes = await fetch(reducedDataUrl);
//         const reducedBlob = await reducedRes.blob();
//         console.log("Reduced image size:", Math.round(reducedBlob.size / 1024), "KB");

//         if (reducedBlob.size > 1024 * 1024) {
//           throw new Error("Unable to generate image within size limits");
//         }

//         blob = reducedBlob;
//       }

//       const file = new File(
//         [blob],
//         `card-${card?.title?.replace(/\s+/g, "-").toLowerCase()}.png`,
//         { type: "image/png" }
//       );

//       // Upload to server
//       const formData = new FormData();
//       formData.append("media", file);

//       console.log("Attempting to upload image...");

//       const uploadResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URLS}/api/auth/twitter/upload-media/${userData.userId}`,
//         {
//           method: "POST",
//           body: formData,
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );

//       if (!uploadResponse.ok) {
//         const errorText = await uploadResponse.text();
//         console.error("Upload failed with status:", uploadResponse.status);
//         console.error("Error response:", errorText);
//         throw new Error(`Failed to upload image: ${uploadResponse.status} ${errorText}`);
//       }

//       const uploadResult = await uploadResponse.json();
//       console.log("Upload result:", uploadResult);

//       if (!uploadResult.success || !uploadResult.mediaId) {
//         console.error("Media upload failed:", uploadResult);
//         throw new Error(`Media upload failed: ${JSON.stringify(uploadResult)}`);
//       }

//       // Post tweet
//       const tweetData = {
//         userId: userData.userId,
//         text: tweetContent,
//         mediaId: uploadResult.mediaId,
//         referralCode: userData.referralCode || "",
//       };

//       console.log("Attempting to post tweet...");
//       const tweetResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URLS}/api/auth/twitter/tweet`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(tweetData),
//         }
//       );

//       if (!tweetResponse.ok) {
//         const errorText = await tweetResponse.text();
//         console.error("Tweet failed with status:", tweetResponse.status);
//         console.error("Error response:", errorText);
//         throw new Error(`Failed to post tweet: ${tweetResponse.status} ${errorText}`);
//       }

//       const tweetResult = await tweetResponse.json();
//       console.log("Tweet result:", tweetResult);

//       if (!tweetResult.tweetId && !tweetResult.tweetData?.tweetId) {
//         console.error("No tweet ID received:", tweetResult);
//         throw new Error(`No tweet ID received: ${JSON.stringify(tweetResult)}`);
//       }

//       // Save tweet data
//       localStorage.setItem(
//         "tweetData",
//         JSON.stringify({
//           tweetId: tweetResult.tweetId || tweetResult.tweetData?.tweetId,
//           userId: userData.userId,
//         })
//       );

//       setTweetPosted(true);
//       toast.success("Tweet posted successfully!");

//     } catch (error: any) {
//       console.error("Error in handleStartRoaring:", error);
//       toast.error(error.message || "Failed to complete the process");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRedirect = () => {
//     const tweetData = JSON.parse(localStorage.getItem("tweetData") || "{}");
//     const userId = userData?.userId || "";
//     const tweetId = tweetData.tweetId || "";
//     window.location.href = `/JoinWaitlist/${userId}/${tweetId}`;
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
//       <div className="absolute inset-0 bg-black/60  z-0" />
//       <div className="flex flex-col items-center justify-center  max-w-6xl px-2 py-3 sm:px-5 sm:py-5 relative z-10 w-full mt-5 ">
//         <h1 className="md:text-4xl text-white font-bold mb-10 text-2xl sm:text-3xl px-10 sm:px-0 text-center">
//           You are now certified <span style={{ color: card.glowColor }}>Clans Roarer</span>!
//         </h1>
//         <div className="hidden lg:block">
//           <ClanCard
//             ref={cardRefDesktop}
//             glowColor={card.glowColor}
//             title={card.title}
//             description={card.description}
//             sideImage={card.sideImage}
//             userId={userData?.userId || ""}
//             profilePic={profilePic}
//             displayName={userData?.socialHandles?.[0]?.displayName}
//             username={userData?.socialHandles?.[0]?.username}
//           />
//         </div>
//         <div className="block lg:hidden">
//           <ClanCardMobile
//             ref={cardRefMobile}
//             glowColor={card.glowColor}
//             title={card.title}
//             description={card.description}
//             sideImage={card.sideImage}
//             userId={userData?.userId || ""}
//             profilePic={profilePic}
//             displayName={userData?.socialHandles?.[0]?.displayName}
//             username={userData?.socialHandles?.[0]?.username}
//           />
//         </div>
//         <div className="flex flex-col md:flex-row gap-5 items-center justify-center mt-5">
//           <Button
//             ButtonText={loading ? "Processing..." : "Start Roaring"}
//             onClick={handleStartRoaring}
//             className="px-4 py-2 text-lg"
//             disabled={loading || tweetPosted}
//             width={250}
//             height={70}
//           />
//           <Button
//             ButtonText="Continue"
//             onClick={handleRedirect}
//             className="px-4 py-2 text-lg"
//             width={250}
//             height={70}
//             disabled={!tweetPosted}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
