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
  ButtonText = "Start Roaring",
  width = 307,
  height = 79,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group cursor-pointer z-10 transition-transform hover:scale-105 active:scale-95 text-white",
        className
      )}
    >
      <div className="relative" style={{ width, height }}>
        {/* Inline SVG */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 309 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 transition-colors duration-300"
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

        {/* Button text */}
        <span className="absolute inset-0 flex items-center justify-center text-white z-10">
          {ButtonText}
        </span>
      </div>
    </button>
  );
}
