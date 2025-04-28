import Image from "next/image";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  ButtonText?: string;
  width?: number;
  height?: number;
  onClick?: () => void; // 🔥 Add this line
}

export default function Button({
  className = "",
  ButtonText = "Start Roaring",
  width = 307,
  height = 79,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 ",
        className
      )}
    >
      <div className="relative w-full h-full">
        <Image
          src="/Images/gettingStarted/Vector01.svg"
          width={width}
          height={height}
          alt="Button"
        />
        <span className="absolute inset-0 flex items-center justify-center ">
          {ButtonText}
        </span>
      </div>
    </button>
  );
}

// export default function Button() {
//   return (
//     <button className="relative w-[307px] h-[79px] z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95 ">
//       <Image
//         src="/Images/gettingStarted/Vector01.svg"
//         width={307}
//         height={79}
//         alt="Vector01"
//       />
//       <span className="absolute inset-0 top-8">Start Roaring </span>
//     </button>
//   );
// }
