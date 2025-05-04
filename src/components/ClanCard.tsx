import React, { forwardRef } from "react";

interface ClanCardProps {
  glowColor: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  profilePic?: string;
  email?: string;
  username?: string;
}

const ClanCard = forwardRef<HTMLDivElement, ClanCardProps>(({
  glowColor,
  title,
  description,
  image,
  userId,
  profilePic,
  email,
  username,
}, ref) => {
  // Always use a safe color for html2canvas compatibility
  const getSafeColor = () => {
    switch (title.toLowerCase()) {
      case 'clan mcbuilder':
        return 'rgba(255, 0, 0, 0.5)';
      case 'mchodler':
        return 'rgba(128, 0, 128, 0.5)';
      case 'clan mcdegen':
        return 'rgba(0, 255, 0, 0.5)';
      case 'clan mcprivacy':
        return 'rgba(0, 0, 255, 0.5)';
      default:
        return 'rgba(128, 128, 128, 0.5)';
    }
  };

  const safeGlowColor = getSafeColor();

  return (
    <div
      ref={ref}
      className="rounded-3xl shadow-2xl flex items-center justify-center relative"
      style={{
        backgroundColor: safeGlowColor,
        width: "950px",
        height: "570px",
        maxWidth: "95vw",
        maxHeight: "70vh",
        boxShadow: `0 0 40px 10px ${safeGlowColor}`,
      }}
    >
      <div className="absolute inset-5 rounded-2xl bg-[url('/Images/cardPage/cardBg.png')] bg-cover bg-center flex flex-col justify-between">
        <div className="flex flex-col p-8 gap-y-6 h-full justify-between">
          <div className="flex flex-row items-center">
            <img
              src={profilePic || "/Images/gettingStarted/user.png"}
              alt="userProfilePic"
              height={80}
              width={80}
              className="rounded-full h-16 w-16 border-white border-2 object-cover"
              loading="eager"
            />
            <div className="flex flex-col py-2 px-3">
              <p className="font-semibold text-lg text-white">{username}</p>
              <p className="text-sm text-gray-400">
                {email}
              </p>
            </div>
          </div>

          <p className="text-base text-white/80 leading-snug">
            I don't tweet anymore. I Roar - with Clan {title} behind me.
            <br />
            Privacy is power. Roar wisely.
          </p>

          <div>
            <h1 className="text-[#9333ea] text-3xl font-semibold">{title}</h1>
            <p className="text-lg text-white/90">{description}</p>
          </div>

          <div className="hidden lg:flex items-center mt-4 gap-2">
            <img
              src="/Images/gettingStarted/Object.png"
              width={40}
              height={80}
              className="w-8 h-16 object-contain"
              alt="Object1"
              loading="eager"
            />
            <img
              src="/Images/gettingStarted/Clans.png"
              width={80}
              height={60}
              className="w-16 h-12 object-contain"
              alt="Clans"
              loading="eager"
            />
          </div>
        </div>
        <img
          src={image}
          alt="Card Image"
          width={180}
          height={250}
          className="absolute bottom-0 right-0 h-[220px] w-[160px] xl:w-1/4 xl:h-[80%] object-contain drop-shadow-lg"
          loading="eager"
        />
      </div>
    </div>
  );
});

ClanCard.displayName = 'ClanCard';

export default ClanCard; 