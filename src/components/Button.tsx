import clsx from "clsx";

interface ButtonProps {
  className?: string;
  ButtonText?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function Button({
  className = "",
  ButtonText = "Start Now!",
  width = 309,
  height = 81,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95",
        className
      )}
      style={{ width, height }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 309 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <path
          d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
          className="fill-black group-hover:fill-white/10 opacity-80 transition-colors duration-300"
        />
        <path
          d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide z-10">
        {ButtonText}
      </span>
    </button>
  );
}
