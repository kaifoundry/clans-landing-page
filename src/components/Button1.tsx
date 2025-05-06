import clsx from "clsx";

interface ButtonProps {
  className?: string;
  ButtonText?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button1({
  className = "",
  ButtonText = "Start Now!",
  width,
  height,
  onClick,
  disabled = false,
}: ButtonProps) {
  // Responsive style: fallback to 100% width, but allow custom width/height
  const style: React.CSSProperties = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : "100%",
    height: height
      ? typeof height === "number"
        ? `${height}px`
        : height
      : "auto",
    minWidth: 200,
    maxWidth: 400,
    minHeight: 60,
    ...((width || height) && {
      minWidth: undefined,
      maxWidth: undefined,
      minHeight: undefined,
    }),
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "group relative z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95 w-full max-w-[309px] min-w-[120px] min-h-[40px]",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
        className
      )}
      style={style}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 309 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z"
          className={clsx(
            "fill-black group-hover:fill-purple-800/40 opacity-80 transition-colors duration-300",
            disabled && "group-hover:fill-black"
          )}
        />
        <path
          d="M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5"
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </svg>

      <span className="absolute  inset-0 flex items-center justify-center text-white font-semibold tracking-wide z-10 text-[21px] sm:text-2xl md:text-2xl">
        {ButtonText}
      </span>
    </button>
  );
}
