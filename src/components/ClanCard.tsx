import React, { forwardRef } from "react";

interface ClanCardProps {
  glowColor: string;
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
    {
      glowColor,
      title,
      description,

      sideImage,
      userId,
      profilePic,
      email,
      username,
      displayName,
      cardImage,
    },
    ref
  ) => {
    // Always use a safe color for html2canvas compatibility
    const getSafeColor = () => {
      switch (title.toLowerCase()) {
        case "clan mcbuilder":
          return "rgba(255, 0, 0, 1.5)";
        case "clan mchodler":
          return "rgba(128, 0, 128, 1.5)";
        case "clan degen":
          return "rgba(0, 0, 255, 0.5)";
        case "clan mcprivacy":
          return "rgba(0, 255, 0, 0.5)";
          
        default:
          return "rgba(128, 128, 128, 0.5)";
      }
    };

    const safeGlowColor = getSafeColor();

    return (
      <div
        ref={ref}
        className="rounded-3xl shadow-2xl flex items-center justify-center relative bg-[url('/Images/cardPage/cardBg.png')] border-2"
        style={{
          width: "1100px",
          height: "570px",
          maxWidth: "95vw",
          maxHeight: "70vh",
          zIndex: 1,
          borderColor: safeGlowColor,

        }}
      >
        <div 
          className="absolute inset-0 rounded-3xl "
          style={{
            boxShadow: `0 0 40px 10px ${safeGlowColor}`,
            backgroundColor: safeGlowColor,
            opacity: 0.5,
            zIndex: 2
          }}
        />
        <div 
          className="absolute inset-5 rounded-2xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center flex flex-col md:flex-row justify-between items-stretch "
          style={{ zIndex: 3 }}
        >
          {/* Left side: user info and text */}
          <div className="flex flex-col justify-between p-4 md:p-8 gap-y-4 md:gap-y-6 w-full md:w-2/3 min-w-[280px] md:min-w-[320px]">
            <div className="flex flex-row items-center mb-4 md:mb-0">
              <img
                src={profilePic || "/Images/gettingStarted/user.png"}
                alt="userProfilePic"
                height={80}
                width={80}
                className="rounded-full h-8 w-8 md:h-16 md:w-16 border-white border-2 object-cover"
                loading="eager"
              />
              <div className="flex flex-col px-3">
                <p className="font-semibold text-base md:text-lg text-white ">
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
                style={{ color: safeGlowColor }}
                className="text-2xl md:text-5xl font-semibold"
              >
                {title}
              </h1>
              <p className="text-lg md:text-2xl text-white/90">{description}</p>
            </div>
            <div className="flex items-center mt-4 gap-2 absolute left-4 bottom-4 z-10 md:static md:mt-4 md:gap-2">
              <img
                src="/Images/gettingStarted/Object.png"
                width={40}
                height={80}
                className="w-4 h-8 md:w-8 md:h-16 object-contain"
                alt="Object1"
                loading="eager"
              />
              <img
                src="/Images/gettingStarted/Clans.png"
                width={80}
                height={60}
                className="w-12 h-10 md:w-28 md:h-20 object-contain"
                alt="Clans"
                loading="eager"
              />
            </div>
          </div>
          {/* Right side: main image */}
          <div className="flex items-end justify-end w-full relative mt-4 md:mt-0">
            {sideImage && (
              <img
                src={sideImage}
                alt="Side Image"
                width={340}
                height={520}
                className="absolute bottom-0 right-0 max-h-[95%] max-w-[430px] w-auto h-auto object-contain drop-shadow-lg"
                loading="eager"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

ClanCard.displayName = "ClanCard";

export default ClanCard;

// import React, { forwardRef } from "react";

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
// }

// const ClanCard = forwardRef<HTMLDivElement, ClanCardProps>(({
//   glowColor,
//   title,
//   description,

//   sideImage,
//   userId,
//   profilePic,
//   email,
//   username,
//   displayName,
// }, ref) => {
//   // Always use a safe color for html2canvas compatibility
//   const getSafeColor = () => {
//     switch (title.toLowerCase()) {
//       case 'clan mcbuilder':
//         return 'rgba(255, 0, 0, 0.5)';
//       case 'mchodler':
//         return 'rgba(128, 0, 128, 0.5)';
//       case 'clan mcdegen':
//         return 'rgba(0, 255, 0, 0.5)';
//       case 'clan mcprivacy':
//         return 'rgba(0, 0, 255, 0.5)';
//       default:
//         return 'rgba(128, 128, 128, 0.5)';
//     }
//   };

//     const safeGlowColor = getSafeColor();

//   return (
//     <div
//       ref={ref}
//       className="rounded-3xl shadow-2xl flex items-center justify-center relative"
//       style={{
//         backgroundColor: safeGlowColor,
//         width: "950px",
//         height: "570px",
//         maxWidth: "95vw",
//         maxHeight: "70vh",
//         boxShadow: `0 0 40px 10px ${safeGlowColor}`,
//       }}
//     >
//       <div className="absolute inset-5 rounded-2xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center flex flex-col md:flex-row justify-between items-stretch">
//         <a
//           href={process.env.NEXT_PUBLIC_API_BASE_URL_FRONTEND}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="absolute right-4 top-4 mb-4 md:mb-0 md:right-6 md:top-[45px] text-white text-sm md:text-xl font-semibold opacity-90 hover:underline z-20"
//         >
//           {process.env.NEXT_PUBLIC_API_BASE_URL_FRONTEND?.replace(/^https?:\/\//, '')}
//         </a>
//         {/* Left side: user info and text */}
//         <div className="flex flex-col justify-between p-4 md:p-8 gap-y-4 md:gap-y-6 w-full md:w-2/3 min-w-[280px] md:min-w-[320px]">
//           <div className="flex flex-row items-center mb-4 md:mb-0">
//             <img
//               src={profilePic || "/Images/gettingStarted/user.png"}
//               alt="userProfilePic"
//               height={80}
//               width={80}
//               className="rounded-full h-14 w-14 md:h-16 md:w-16 border-white border-2 object-cover"
//               loading="eager"
//             />
//             <div className="flex flex-col py-2 px-3 mt-6 md:mt-0">
//               <p className="font-semibold text-base md:text-lg text-white">{displayName}</p>
//               {username && (
//                 <p className="text-xs md:text-sm text-purple-300 font-medium">@{username}</p>
//               )}
//               <p className="text-xs md:text-sm text-gray-400">
//                 {email}
//               </p>
//             </div>
//           </div>
//           <div>
//             <h1 className="text-[#9333ea] text-3xl md:text-5xl font-semibold">{title}</h1>
//             <p className="text-lg md:text-2xl text-white/90">{description}</p>
//           </div>
//           <div className="flex items-center mt-4 gap-2 absolute left-4 bottom-4 z-10 md:static md:mt-4 md:gap-2">
//             <img
//               src="/Images/gettingStarted/Object.png"
//               width={40}
//               height={80}
//               className="w-6 h-12 md:w-8 md:h-16 object-contain"
//               alt="Object1"
//               loading="eager"
//             />
//             <img
//               src="/Images/gettingStarted/Clans.png"
//               width={80}
//               height={60}
//               className="w-20 h-16 md:w-28 md:h-20 object-contain"
//               alt="Clans"
//               loading="eager"
//             />
//           </div>
//         </div>
//         {/* Right side: main image */}
//         <div className="flex items-end justify-end w-full md:w-1/3 relative mt-4 md:mt-0">
//           {sideImage && (
//             <img
//               src={sideImage}
//               alt="Side Image"
//               width={340}
//               height={520}
//               className="h-[280px] w-[200px] md:h-[440px] md:w-[320px] xl:w-[360px] xl:h-[450px] object-contain drop-shadow-lg absolute bottom-0 -right-6 md:mx-auto md:absolute md:bottom-0 md:-right-7"
//               loading="eager"
//             />
//           )}
//           {/* <img
//             src={image}
//             alt="Card Image"
//             width={340}
//             height={520}
//             className="h-[280px] w-[200px] md:h-[440px] md:w-[320px] xl:w-[360px] xl:h-[450px] object-contain drop-shadow-lg absolute bottom-0 -right-6 md:mx-auto md:absolute md:bottom-0 md:-right-7"
//             loading="eager"
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// });

// ClanCard.displayName = "ClanCard";

// export default ClanCard;
