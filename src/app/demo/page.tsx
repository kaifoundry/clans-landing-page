// "use client";

// import React, { useRef } from "react";
// import html2canvas from "html2canvas";

// interface CardProps {
//   glowColor: string;
//   title: string;
//   description: string;
//   image: string;
// }

// interface UserData {
//   email?: string;
// }

// interface Props {
//   card: CardProps;
//   username: string;
//   userData?: UserData;
//   profilePic?: string;
// }

// const CardImageDownloader: React.FC<Props> = ({
//   card,
//   username,
//   userData,
//   profilePic,
// }) => {
//   const printRef = useRef<HTMLDivElement>(null);

//   const handleDownloadImage = async () => {
//     if (!printRef.current) return;

//     const canvas = await html2canvas(printRef.current, { useCORS: true });
//     const data = canvas.toDataURL("image/jpeg");

//     const link = document.createElement("a");
//     link.href = data;
//     link.download = "card_image.jpg";

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div>
//       <button onClick={handleDownloadImage}>Download as Image</button>

//       <div style={{ marginTop: 20 }}>
//         <div ref={printRef}>
//           <div
//             className="rounded-3xl shadow-2xl flex items-center justify-center relative"
//             style={{
//               backgroundColor: card.glowColor,
//               width: "950px",
//               height: "570px",
//               maxWidth: "95vw",
//               maxHeight: "70vh",
//               boxShadow: `0 0 40px 10px ${card.glowColor}`,
//             }}
//           >
//             <div className="absolute inset-5 rounded-2xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center flex flex-col justify-between">
//               <div className="flex flex-col p-8 gap-y-6 h-full justify-between">
//                 <div className="flex flex-row items-center">
//                   <img
//                     src={profilePic || "/Images/gettingStarted/user.png"}
//                     alt="userProfilePic"
//                     height={80}
//                     width={80}
//                     className="rounded-full h-16 w-16 border-white border-2 object-cover"
//                   />
//                   <div className="flex flex-col py-2 px-3">
//                     <p className="font-semibold text-lg">{username}</p>
//                     <p className="text-sm text-gray-400">
//                       {userData?.email || "Email does not exist"}
//                     </p>
//                   </div>
//                 </div>

//                 <p className="text-base text-white/80 leading-snug">
//                   I don't tweet anymore. I Roar - with Clan {card.title} behind
//                   me.
//                   <br />
//                   Privacy is power. Roar wisely.
//                 </p>

//                 <div>
//                   <h1 className="text-purple-500 text-3xl font-semibold">
//                     {card.title}
//                   </h1>
//                   <p className="text-lg text-white/90">{card.description}</p>
//                 </div>

//                 <div className="hidden lg:flex items-center mt-4 gap-2">
//                   <img
//                     src="/Images/gettingStarted/Object.png"
//                     width={40}
//                     height={80}
//                     className="w-8 h-16 object-contain"
//                     alt="Object1"
//                   />
//                   <img
//                     src="/Images/gettingStarted/Clans.png"
//                     width={80}
//                     height={60}
//                     className="w-16 h-12 object-contain"
//                     alt="Clans"
//                   />
//                 </div>
//               </div>
//               <img
//                 src={card.image}
//                 alt="Card Image"
//                 width={180}
//                 height={250}
//                 className="absolute bottom-0 right-0 h-[220px] w-[160px] xl:w-1/4 xl:h-[80%] object-contain drop-shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardImageDownloader;

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
