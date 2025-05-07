"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { useClan } from "@/context/ClanContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { clansData } from "@/data/selectClanData";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion import

const SelectClan = () => {
  const router = useRouter();
  const { clans, loading, error, selectedCardId, setSelectedCardId, joinClan } = useClan();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [displayedTitle, setDisplayedTitle] = useState<string>("");
  const [displayedDescription, setDisplayedDescription] = useState<string>("");
  const [clanColor, setClanColor] = useState<string>("#ffffff");
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    image: string;
    hoverImage: string;
    cardImage: string;
    title: string;
    description: string;
    glowColor: string;
    cardCharacter: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingClanId, setPendingClanId] = useState<string | null>(null);

  const cardData = useMemo(() => {
    return Array.isArray(clans)
      ? clans.map((clan, index) => {
          const clanData = clansData[index] || {};
          return {
            id: clan.clanId,
            title: clan.title,
            description: clan.description,
            image: clanData.image || "",
            hoverImage: clanData.hoverImage || "",
            cardImage: clanData.image || "",
            glowColor: clanData.glowColor || "",
            cardCharacter: clanData.selectImage || "",
            textColor: clanData.color || ""
          };
        })
      : [];
  }, [clans]);

  useEffect(() => {
    if (selectedCardId !== null) {
      const clan = cardData.find((card) => card.id === String(selectedCardId));
      if (clan) {
        const index = cardData.findIndex((c) => c.id === clan.id);
        setActiveIndex(index !== -1 ? index : null);
        setSelectedCard(clan);
        setAvatarImage(clan.hoverImage);
        setDisplayedTitle(clan.title);
        setDisplayedDescription(clan.description);
      }
    }
  }, [selectedCardId, cardData]);

  const handleJoinClan = (clanId: string) => {
    setPendingClanId(clanId);
    setSelectedCardId(clanId);
    const clan = cardData.find((card) => card.id === clanId);
    if (clan) {
      setSelectedCard(clan);
    }
    setModalOpen(true);
  };

  const handleConfirmJoin = async () => {
    setModalOpen(false);

    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;
    const storedUserId = user?.userId;

    if (!storedUserId || !pendingClanId) {
      toast.error("Missing user or clan ID.");
      return;
    }

    const joinData = {
      userId: storedUserId,
      clanId: pendingClanId,
    };

    try {
      const success = await joinClan(joinData);
      if (success) {
        toast.success("Successfully joined the clan!");
        setSelectedCardId(pendingClanId);
        router.push("/CardPage");
      } else {
        toast.error("Failed to join clan. Please try again.");
      }
    } catch (error) {
      console.error("Error while calling joinClan API: ", error);
      toast.error("Failed to join clan due to network or server error.");
    }
  };

  if (loading) return <div>Loading clans...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="main-section p-4 overflow-hidden">
      <div className="relative w-full overflow-hidden flex justify-start flex-col gap-y-8">
        <h1 className="text-3xl text-center font-semibold">Claim your Clan</h1>

        <div className="z-10">
          <div className="flex gap-x-2 items-center ">
            <div className="h-7 w-[2px]" style={{ backgroundColor: clanColor }} />
            <h2 className="text-[26px] font-bold">{displayedTitle}</h2>
          </div>
          <p className="text-lg font-semibold z-1">{displayedDescription}</p>
        </div>

        <div className="w-[50%] grid grid-cols-2 gap-x-10 gap-y-5 z-10 p-2">
          {cardData.map((clan, index) => (
            <div
              key={clan.id}
              onClick={() => {
                if (activeIndex !== index) {
                  setActiveIndex(index);
                  setAvatarImage(clan.hoverImage);
                  setSelectedCard(clan);
                  setSelectedCardId(clan.id);
                  setDisplayedTitle(clan.title);
                  setDisplayedDescription(clan.description);
                }
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setAvatarImage(clan.cardImage);
                setDisplayedTitle(clan.title);
                setDisplayedDescription(clan.description);
                setClanColor(clan.glowColor);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                if (activeIndex !== null) {
                  const active = cardData[activeIndex];
                  setAvatarImage(active.cardImage);
                  setDisplayedTitle(active.title);
                  setDisplayedDescription(active.description);
                }
              }}
              className={clsx(
                "relative h-[145px] w-[85px] cursor-pointer",
                activeIndex === index ? "scale-105" : "scale-100"
              )}
              style={{
                filter:
                  activeIndex === index || hoveredIndex === index
                    ? `drop-shadow(0 0 1px ${clan.glowColor}) drop-shadow(0 0 6px ${clan.glowColor})`
                    : "none",
                transition: "filter 0.4s ease, transform 0.4s ease",
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  clipPath:
                    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                  boxShadow:
                    activeIndex === index || hoveredIndex === index
                      ? `0 0 2px ${clan.glowColor}, 0 0 10px ${clan.glowColor}`
                      : "none",
                  backgroundColor:
                    activeIndex === index || hoveredIndex === index
                      ? clan.glowColor
                      : "white",
                }}
              ></div>

              <div
                className="absolute inset-[2px] text-white bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center "
                style={{
                  clipPath:
                    "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
                  backgroundImage: `url(${clan.image})`,
                  transition: "background-image 0.4s ease",
                }}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center z-1 mt-8 sm:mt-[37px] lg:mt-8">
          {selectedCard && (
            <button
              className="group cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 text-white"
              onClick={() => handleJoinClan(selectedCard.id)}
            >
              <div className="relative w-[270px] h-[75px] ">
                <svg
                  viewBox="0 0 309 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 left-0 w-full h-full transition-colors duration-300"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
                    className="fill-[#0E0E17] group-hover:fill-pink-500 opacity-50"
                    fillOpacity="0.8"
                  />
                  <path
                    d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
                    stroke="white"
                    strokeOpacity="0.24"
                    strokeWidth="2"
                  />
                </svg>

                <span className="absolute inset-0 w-full h-full flex items-center justify-center text-white z-10 text-[21px] sm:text-2xl md:text-2xl font-medium">
                  Join Clan
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* ✅ Animated Character Avatar Image */}
      <AnimatePresence>
        {avatarImage && (
          <motion.img
            key={avatarImage}
            src={avatarImage}
            alt="bgAvatar"
            className="absolute bottom-0 right-0 z-0"
            width={280}
            height={300}
            draggable={false}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />
          <motion.div className="relative bg-black border border-gray-200 p-6 rounded-2xl w-full max-w-md mx-4 z-10"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              Clan Confirmation
            </h3>
            <div className="mb-6 text-center">
              <p className="mb-4 text-sm font-semibold">
                Are you sure you want to choose
              </p>
              <p className="text-xl font-bold" style={{ color: selectedCard?.glowColor }}>
                {selectedCard?.title}
              </p>
              <p className="mt-2 font-display font-semibold">
                {selectedCard?.description}
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                ButtonText="Yes"
                onClick={handleConfirmJoin}
                width={130}
                height={40}
              />
              <Button
                ButtonText="No, go back"
                onClick={() => setModalOpen(false)}
                width={130}
                height={40}
                className="bg-red-500 hover:bg-gray-600"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default SelectClan;





// "use client";

// import Image from "next/image";
// import Button from "@/components/Button";
// import Link from "next/link";
// import { useState, useEffect, useMemo } from "react";
// import clsx from "clsx";
// import { useClan } from "@/context/ClanContext";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { clansData } from "@/data/selectClanData";

// const SelectClan = () => {
//   const router = useRouter();
//   const { clans, loading, error, selectedCardId, setSelectedCardId, joinClan } = useClan();

//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const [avatarImage, setAvatarImage] = useState<string>("");
//   const [displayedTitle, setDisplayedTitle] = useState<string>("");
//   const [displayedDescription, setDisplayedDescription] = useState<string>("");
//   const [clanColor, setClanColor] = useState<string>("#ffffff");
//   console.log("clanColor", clanColor);
//   const [selectedCard, setSelectedCard] = useState<{
//     id: string;
//     image: string;
//     hoverImage: string;
//     cardImage: string;
//     title: string;
//     description: string;
//     glowColor: string;
//     cardCharacter: string;
//   } | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [pendingClanId, setPendingClanId] = useState<string | null>(null);

//   const cardData = useMemo(() => {
//     return Array.isArray(clans) ? clans.map((clan, index) => {
//       const clanData = clansData[index] || {};
//       return {
//         id: clan.clanId,
//         title: clan.title,
//         description: clan.description,
//         image: clanData.image || "",
//         hoverImage: clanData.hoverImage || "",
//         cardImage: clanData.image || "",
//         glowColor: clanData.glowColor || "",
//         cardCharacter: clanData.selectImage || "",
//       };
//     }) : [];
//   }, [clans]);

//   useEffect(() => {
//     if (clans && clans.length > 0) {
//       console.log("🔥 Current Clans State:", clans);
//     }
//   }, [clans]);

//   useEffect(() => {
//     if (selectedCardId !== null) {
//       const clan = cardData.find((card) => card.id === String(selectedCardId));
//       if (clan) {
//         const index = cardData.findIndex(c => c.id === clan.id);
//         setActiveIndex(index !== -1 ? index : null);
//         setSelectedCard(clan);
//         setAvatarImage(clan.hoverImage);
//         setDisplayedTitle(clan.title);
//         setDisplayedDescription(clan.description);
//       }
//     }
//   }, [selectedCardId, cardData]);

//   const handleSelectId = (id: string) => {
//     setSelectedCardId(id);
//     console.log(id);
//   };

//   const handleJoinClan = (clanId: string) => {
//     setPendingClanId(clanId);
//     setSelectedCardId(clanId);
//     const clan = cardData.find((card) => card.id === clanId);
//     if (clan) {
//       setSelectedCard(clan);
//     }
//     setModalOpen(true);
//   };

//   const handleConfirmJoin = async () => {
//     setModalOpen(false);

//     const userData = localStorage.getItem("userData");
//     const user = userData ? JSON.parse(userData) : null;
//     const storedUserId = user?.userId;

//     console.log("Stored User ID from the Local Storage:", storedUserId);
//     console.log("Selected Clan ID:", pendingClanId);

//     if (!storedUserId || !pendingClanId) {
//       toast.error("Missing user or clan ID.");
//       return;
//     }

//     const joinData = {
//       userId: storedUserId,
//       clanId: pendingClanId,
//     };

//     console.log("sending this data to joinClan API:", joinData);

//     try {
//       const success = await joinClan(joinData);
//       if (success) {
//         toast.success("Successfully joined the clan!");
//         setSelectedCardId(pendingClanId);
//         router.push("/CardPage");
//       } else {
//         toast.error("Failed to join clan. Please try again.");
//       }
//     } catch (error) {
//       console.error("❌ Error while calling joinClan API: ", error);
//       toast.error("Failed to join clan due to network or server error.");
//     }
//   };

//   if (loading) return <div>Loading clans...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <section className="main-section p-4 overflow-hidden">
//       <div className="relative w-full overflow-hidden flex justify-start flex-col gap-y-8">
//         <h1 className="text-3xl text-center font-semibold">Claim your Clan</h1>

//         <div className="z-10">
//           <div className="flex gap-x-2 items-center ">
//             <div
//               className="h-7 w-[2px]"
//               style={{ backgroundColor: clanColor }}
//             ></div>

//             <h2 className="text-[26px] font-bold">{displayedTitle}</h2>
//           </div>
//           <p className="text-lg font-semibold z-1">{displayedDescription}</p>
//         </div>

//         <div className="w-[50%] grid grid-cols-2 gap-x-10 gap-y-5 z-10 p-2">
//           {cardData.map((clan, index) => (
//             <div
//               key={clan.id}
//               onClick={() => {
//                 if (activeIndex !== index) {
//                   setActiveIndex(index);
//                   setAvatarImage(clan.hoverImage);
//                   setSelectedCard(clan);
//                   setSelectedCardId(clan.id);
//                   setDisplayedTitle(clan.title);
//                   setDisplayedDescription(clan.description);
//                 }
//               }}
//               onMouseEnter={() => {
//                 if (hoveredIndex !== index) {
//                   setHoveredIndex(index);
//                   setAvatarImage(clan.cardImage);
//                   setDisplayedTitle(clan.title);
//                   setDisplayedDescription(clan.description);
//                   setClanColor(clan.glowColor);
//                 }
//               }}
//               onMouseLeave={() => {
//                 if (hoveredIndex !== null) {
//                   setHoveredIndex(null);
//                   if (activeIndex !== null) {
//                     const active = cardData[activeIndex];
//                     setAvatarImage(active.cardImage);
//                     setDisplayedTitle(active.title);
//                     setDisplayedDescription(active.description);
//                   }
//                 }
//               }}
//               className={clsx(
//                 "relative h-[145px] w-[85px] cursor-pointer",
//                 activeIndex === index ? "scale-105" : "scale-100"
//               )}
//               style={{
//                 filter:
//                   activeIndex === index || hoveredIndex === index
//                     ? `drop-shadow(0 0 1px ${clan.glowColor}) drop-shadow(0 0 6px ${clan.glowColor})`
//                     : "none",
//                 transition: "filter 0.4s ease, transform 0.4s ease",
//               }}
//             >
//               <div
//                 className="absolute inset-0 transition-all duration-500"
//                 style={{
//                   clipPath:
//                     "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
//                   boxShadow:
//                     activeIndex === index || hoveredIndex === index
//                       ? `0 0 2px ${clan.glowColor}, 0 0 10px ${clan.glowColor}`
//                       : "none",
//                   backgroundColor:
//                     activeIndex === index || hoveredIndex === index
//                       ? clan.glowColor
//                       : "white",
//                 }}
//               ></div>

//               <div
//                 className="absolute inset-[2px] text-white bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center "
//                 style={{
//                   clipPath:
//                     "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
//                   backgroundImage: `url(${clan.image})`,
//                   transition: "background-image 0.4s ease",
//                 }}
//               >
//                 {/* <h3
//                   className="text-[12px] font-medium text-center px-2 absolute bottom-0"
//                   style={{
//                     textShadow:
//                       "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8)",
//                   }}
//                 >
//                   {clan.title}
//                 </h3> */}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="w-full flex items-center justify-center z-1 mt-8 sm:mt-[37px] lg:mt-8">
//           {selectedCard && (
//             <button
//               className="group cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 text-white"
//               onClick={() => handleJoinClan(selectedCard.id)}
//             >
//               <div className="relative w-[270px] h-[75px] ">
//                 <svg
//                   viewBox="0 0 309 81"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="absolute top-0 left-0 w-full h-full transition-colors duration-300"
//                   preserveAspectRatio="xMidYMid meet"
//                 >
//                   <path
//                     d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
//                     className="fill-[#0E0E17] group-hover:fill-pink-500 opacity-50"
//                     fillOpacity="0.8"
//                   />
//                   <path
//                     d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
//                     stroke="white"
//                     strokeOpacity="0.24"
//                     strokeWidth="2"
//                   />
//                 </svg>

//                 <span className="absolute inset-0 w-full h-full flex items-center justify-center text-white z-10 text-[21px] sm:text-2xl md:text-2xl font-medium">
//                   Join Clan
//                 </span>
//               </div>
//             </button>
//           )}
//         </div>
//       </div>

//       {avatarImage && (
//         <Image
//           src={avatarImage}
//           height={300}
//           width={280}
//           alt="bgAvatar"
//           className="absolute bottom-0 right-0 z-0 "
//           draggable={false}
//         />
//       )}

//       {/* Confirmation Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/50 bg-opacity-50 backdrop-blur-xs"
//             onClick={() => setModalOpen(false)}
//           />

//           <div className="relative bg-black border border- text-white p-6 rounded-lg w-full max-w-md mx-4 z-10">
//             <h3 className="text-xl font-bold mb-4 text-center">
//               Clan Confirmation
//             </h3>

//             <div className="mb-6 text-center">
//               <p className="mb-4">Are you confirm you want to choose</p>
//               <p className="text-xl font-bold text-purple-400">
//                 {selectedCard?.title}
//               </p>
//               <p className="mt-2 italic">"{selectedCard?.description}"</p>
//             </div>

//             <div className="flex justify-center gap-4">
//               <Button
//                 ButtonText="No, go back"
//                 onClick={() => setModalOpen(false)}
//                 width={130}
//                 height={40}
//                 className="bg-gray-700 hover:bg-gray-600"
//               />
//               <Button
//                 ButtonText="Yes"
//                 onClick={handleConfirmJoin}
//                 width={130}
//                 height={40}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black/50 bg-opacity-50 backdrop-blur-xs"
//             onClick={() => setModalOpen(false)}
//           />

//           <div className="relative bg-black border border-gray-200 p-6 rounded-2xl w-full max-w-md mx-4 z-10">
//             <h3 className="text-xl font-bold mb-4 text-center">
//               Clan Confirmation
//             </h3>

//             <div className="mb-6 text-center">
//               <p className="mb-4 text-sm font-semibold">
//                 Are you sure you want to choose
//               </p>
//               <p
//                 className="text-xl font-bold text-white"
//                 // style={{ color: clanColor }}
//               >
//                 {selectedCard?.title}
//               </p>
//               <p className="mt-2 font-display font-semibold">
//                 {selectedCard?.description}
//               </p>
//             </div>

//             <div className="flex justify-center gap-4">
//               <Button
//                 ButtonText="Yes"
//                 onClick={handleConfirmJoin}
//                 width={130}
//                 height={40}
//               />
//               <Button
//                 ButtonText="No"
//                 onClick={() => setModalOpen(false)}
//                 width={130}
//                 height={40}
//                 className="bg-red-500 hover:bg-gray-600"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default SelectClan;
