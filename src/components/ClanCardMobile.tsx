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
  cardCharacter?: string;
}

const ClanCardMobile = forwardRef<HTMLDivElement, ClanCardProps>(
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
      cardCharacter,
    },
    ref
  ) => {
    // Always use a safe color for html2canvas compatibility
    // const getSafeColor = () => {
    //   switch (title.toLowerCase()) {
    //     case 'clan mcbuilder':
    //       return 'rgba(255, 0, 0, 0.5)';
    //     case 'mchodler':
    //       return 'rgba(255, 0, 255, 0.5)';
    //     case 'clan mcdegen':
    //       return 'rgba(0, 255, 0, 0.5)';
    //     case 'clan mcprivacy':
    //       return 'rgba(0, 0, 255, 0.5)';
    //     default:
    //       return 'rgba(128, 128, 128, 0.5)';
    //   }
    // };

    const getSafeColor = () => {
      switch (title.toLowerCase()) {
        case "clan mcbuilder":
          return "rgba(255, 0, 0, 1)";
        case "clan mchodler":
          return "rgba(128, 0, 128, 0.5)";
        case "clan degen":
          return "rgba(0, 0, 255, 0.5)";
        case "clan mcprivacy":
          return "rgba(0, 255, 0, 0.5)";
          
        default:
          return "rgba(128, 128, 128, 0.5)";// Very dark gray
      }
    };

    const getSafeColorBorder = () => {
      switch (title.toLowerCase()) {
        case "clan mcbuilder":
          return "rgba(255, 0, 0, 1)";
        case "clan mchodler":
          return "rgba(128, 0, 128, 0.5)";
        case "clan degen":
          return "rgba(0, 0, 255, 0.5)";
        case "clan mcprivacy":
          return "rgba(0, 255, 0, 0.5)";
          
        default:
          return "rgba(128, 128, 128, 0.5)";
      }
    };

    const safeGlowColor = getSafeColor();
    const safeColorBorder = getSafeColorBorder();

    return (
      <div
        ref={ref}
        className="rounded-3xl shadow-2xl flex items-center justify-center relative bg-[url('/Images/cardPage/cardBg.png')] border-2"
        style={{
          width: "320px",
          height: "360px",
          maxWidth: "95vw",
          maxHeight: "70vh",
          zIndex: 1,
          borderColor: safeColorBorder,
        }}
      >
        {/* Background image and black translucent overlay */}
        <div className="absolute inset-3 rounded-2xl overflow-hidden " 
         style={{
          boxShadow: `0 0 40px 10px ${safeGlowColor}`,
          backgroundColor: safeGlowColor,
          opacity: 0.5,
          zIndex: 2
        }}>
          <div className="absolute inset-0 bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center " 
          style={{ zIndex: 3 }}
          />
          <div className="absolute inset-0 bg-black/70 bg-opacity-90 z-10" />
          <div className="relative z-20 flex flex-col md:flex-row justify-between items-stretch h-full">
            {/* Left side: user info and text */}
            <div className=" flex flex-col justify-between p-4 md:p-8 gap-y-4 md:gap-y-6 w-full md:w-2/3 min-w-[280px] md:min-w-[320px]">
              <div className="flex flex-row items-center mb-4 md:mb-0">
                <img
                  src={profilePic || "/Images/gettingStarted/user.png"}
                  alt="userProfilePic"
                  height={80}
                  width={80}
                  className="rounded-full h-8 w-8 md:h-16 md:w-16 border-white border-2 object-cover z-0"
                  loading="eager"
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
                  style={{ color: safeColorBorder }}
                  className="text-xl md:text-5xl font-bold z-10"
                >
                  {title}
                </h1>
                <p className="text-[14px] font-semibold md:text-2xl text-white/90 relative z-10">
                  {description}
                </p>
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
            <div className="flex items-end justify-end w-full md:w-1/3 relative mt-4 md:mt-0">
              {sideImage && (
                <img
                  src={sideImage}
                  alt="Side Image"
                  width={340}
                  height={520}
                  className="h-[280px] w-[200px] md:h-[440px] md:w-[320px] xl:w-[360px] xl:h-[450px] object-contain drop-shadow-lg absolute -bottom-16 -right-6 md:mx-auto md:absolute md:bottom-0 md:-right-7"
                  loading="eager"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ClanCardMobile.displayName = "ClanCardMobile";

export default ClanCardMobile;
