
import ButtonBackgroundSVG from "@/constant/ButtonBackgroundSVG";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  ButtonText?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
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
        disabled &&
          "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100",
        className
      )}
      style={style}
    >
      <ButtonBackgroundSVG disabled={disabled} />

      <span className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide z-10 text-[21px] sm:text-[21px] md:text-2xl">
        {ButtonText}
      </span>
    </button>
  );
}
