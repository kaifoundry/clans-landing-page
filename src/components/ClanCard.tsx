import React, { forwardRef } from "react";
import { motion } from "framer-motion";

interface ClanCardProps {
  glowColor?: string;
  title: string;
  description: string;
  image?: string;
  sideImage?: string;
  userId: string;
  profilePic?: string;
  email?: string;
  username?: string;
  displayName?: string;
  cardImage?: string;
}

const ClanCard = forwardRef<HTMLDivElement, ClanCardProps>(
  (
    { title, description, sideImage, profilePic, email, username, displayName },
    ref
  ) => {
    const getColorPalette = (title: string) => {
      switch (title.toLowerCase()) {
        case "clan mcbuilder":
          return {
            border: "rgba(255, 69, 69, 1)",
            glow: "rgba(255, 69, 69, 0.4)",
          };
        case "clan mchodler":
          return {
            border: "rgba(151, 71, 255, 1)",
            glow: "rgba(151, 71, 255, 0.4)",
          };
        case "clan mcdegen":
          return {
            border: "rgba(0, 142, 31, 1)",
            glow: "rgba(0, 142, 31, 0.4)",
          };
        case "clan mcprivacy":
          return {
            border: "rgba(44, 117, 242, 1)",
            glow: "rgba(44, 117, 242, 0.4)",
          };
        default:
          return {
            border: "rgba(128, 128, 128, 0.5)",
            glow: "rgba(128, 128, 128, 0.5)",
          };
      }
    };

    const { border, glow } = getColorPalette(title);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-3xl shadow-2xl flex items-center justify-center relative border-2"
        style={{
          width: "1100px",
          height: "570px",
          maxWidth: "95vw",
          maxHeight: "70vh",
          zIndex: 1,
          borderColor: border,
          backgroundImage: "url('/Images/cardPage/cardBg.png')",
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow: `0 0 40px 10px ${glow}`,
            backgroundColor: glow,
            zIndex: 2,
          }}
        />
        <div
          className="absolute inset-5 rounded-2xl bg-cover bg-center flex flex-col md:flex-row justify-between items-stretch"
          style={{
            zIndex: 3,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/Images/cardPage/cardBg.png")`,
          }}
        >
          {/* Left Side */}
          <div className="flex flex-col justify-between p-4 md:p-8 gap-y-4 md:gap-y-6 w-full md:w-2/3 min-w-[280px] md:min-w-[320px]">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={profilePic || "/Images/gettingStarted/user.png"}
                alt="userProfilePic"
                className="rounded-full h-8 w-8 md:h-16 md:w-16 border-white border-2 object-cover"
                loading="eager"
                draggable="false"
              />
              <div className="flex flex-col px-3">
                <p className="font-semibold text-base md:text-lg text-white">
                  {displayName}
                </p>
                {username && (
                  <p className="text-xs md:text-sm text-purple-300 font-medium">
                    @{username}
                  </p>
                )}
                <p className="text-xs md:text-sm text-gray-400">{email}</p>
              </div>
            </div>
            <div>
              <h1
                style={{ color: border }}
                className="text-2xl md:text-5xl font-semibold"
              >
                {title}
              </h1>
              <p className="text-lg md:text-2xl font-semibold text-white/90">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2 absolute left-4 bottom-4 z-10 md:static md:mt-4">
              <img
                src="/Images/gettingStarted/Object.png"
                alt="Object1"
                className="w-4 h-8 md:w-8 md:h-16 object-contain"
                loading="eager"
                draggable="false"
              />
              <img
                src="/Images/gettingStarted/Clans.png"
                alt="Clans"
                className="w-12 h-10 md:w-28 md:h-20 object-contain"
                loading="eager"
                draggable="false"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-end justify-end w-full relative mt-4 md:mt-0">
            {sideImage && (
              <img
                src={sideImage}
                alt="Side Image"
                className="absolute bottom-0 right-0 max-h-[95%] max-w-[430px] object-contain drop-shadow-lg"
                loading="eager"
                draggable="false"
              />
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

ClanCard.displayName = "ClanCard";

export default ClanCard;

// import React, { forwardRef } from "react";
// import { motion } from "framer-motion";

// interface ClanCardProps {
//   glowColor: string;
//   title: string;
//   description: string;
//   image?: string;
//   sideImage?: string;
//   userId: string;
//   profilePic?: string;
//   email?: string;
//   username?: string;
//   displayName?: string;
//   cardImage?: string;
// }

// const ClanCard = forwardRef<HTMLDivElement, ClanCardProps>(
//   (
//     {
//       title,
//       description,
//       sideImage,
//       profilePic,
//       email,
//       username,
//       displayName,
//     },
//     ref
//   ) => {
//     const getSafeColor = () => {
//       switch (title.toLowerCase()) {
//         case "clan mcbuilder":
//           return "rgba(255, 69, 69, 1)";
//         case "clan mchodler":
//           return "rgba(151, 71, 255, 1)";
//         case "clan mcdegen":
//           return "rgba(0, 142, 31, 1)";
//         case "clan mcprivacy":
//           return "rgba(44, 117, 242, 1)";
//         default:
//           return "rgba(128, 128, 128, 0.5)";
//       }
//     };

//     const safeGlowColor = () => {
//       switch (title.toLowerCase()) {
//         case "clan mcbuilder":
//           return "rgba(255, 69, 69, 0.4)";
//         case "clan mchodler":
//           return "rgba(151, 71, 255, 0.4)";
//         case "clan mcdegen":
//           return "rgba(0, 142, 31, 0.4)";
//         case "clan mcprivacy":
//           return "rgba(44, 117, 242, 0.4)";
//         default:
//           return "rgba(128, 128, 128, 0.5)";
//       }
//     };

//     return (
//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0, y: -50, scale: 0.9 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="rounded-3xl shadow-2xl flex items-center justify-center relative bg-[url('/Images/cardPage/cardBg.png')] border-2"
//         style={{
//           width: "1100px",
//           height: "570px",
//           maxWidth: "95vw",
//           maxHeight: "70vh",
//           zIndex: 1,
//           borderColor: safeGlowColor(),
//         }}
//       >
//         <div
//           className="absolute inset-0 rounded-3xl"
//           style={{
//             boxShadow: `0 0 40px 10px ${safeGlowColor}`,
//             backgroundColor: safeGlowColor(),
//             // opacity: 0.3,
//             zIndex: 2,
//           }}
//         />
//         <div
//           className="absolute inset-5 rounded-2xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center flex flex-col md:flex-row justify-between items-stretch"
//           style={{
//             zIndex: 3,
//             backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url("/Images/cardPage/cardBg.png")'
//           }}
//         >
//           {/* Left side: user info and text */}
//           <div className="flex flex-col justify-between p-4 md:p-8 gap-y-4 md:gap-y-6 w-full md:w-2/3 min-w-[280px] md:min-w-[320px]">
//             <div className="flex flex-row items-center mb-4 md:mb-0">
//               <img
//                 src={profilePic || "/Images/gettingStarted/user.png"}
//                 alt="userProfilePic"
//                 height={80}
//                 width={80}
//                 className="rounded-full h-8 w-8 md:h-16 md:w-16 border-white border-2 object-cover"
//                 loading="eager"
//                 draggable="false"
//               />
//               <div className="flex flex-col px-3">
//                 <p className="font-semibold text-base md:text-lg text-white">
//                   {displayName}
//                 </p>
//                 {username && (
//                   <p className="text-xs md:text-sm text-purple-300 font-medium">
//                     @{username}
//                   </p>
//                 )}
//                 <p className="text-xs md:text-sm text-gray-400">{email}</p>
//               </div>
//             </div>
//             <div>
//               <h1
//                 style={{ color: getSafeColor() }}
//                 className="text-2xl md:text-5xl font-semibold"
//               >
//                 {title}
//               </h1>
//               <p className="text-lg md:text-2xl font-semibold text-white/90">{description}</p>
//             </div>
//             <div className="flex items-center mt-4 gap-2 absolute left-4 bottom-4 z-10 md:static md:mt-4 md:gap-2">
//               <img
//                 src="/Images/gettingStarted/Object.png"
//                 width={40}
//                 height={80}
//                 className="w-4 h-8 md:w-8 md:h-16 object-contain"
//                 alt="Object1"
//                 loading="eager"
//                 draggable="false"
//               />
//               <img
//                 src="/Images/gettingStarted/Clans.png"
//                 width={80}
//                 height={60}
//                 className="w-12 h-10 md:w-28 md:h-20 object-contain"
//                 alt="Clans"
//                 loading="eager"
//                 draggable="false"
//               />
//             </div>
//           </div>

//           {/* Right side: main image */}
//           <div className="flex items-end justify-end w-full relative mt-4 md:mt-0">
//             {sideImage && (
//               <img
//                 src={sideImage}
//                 alt="Side Image"
//                 width={340}
//                 height={520}
//                 className="absolute bottom-0 right-0 max-h-[95%] max-w-[430px] w-auto h-auto object-contain drop-shadow-lg"
//                 loading="eager"
//                 draggable="false"
//               />
//             )}
//           </div>
//         </div>
//       </motion.div>
//     );
//   }
// );

// ClanCard.displayName = "ClanCard";

// export default ClanCard;
