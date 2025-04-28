type cardProps = {
  image: string;
  title: string;
  description: string;
  width?: string;
  height?: string;
};

const Card = ({ image, title, description }: cardProps) => {
  return (
    <div className="relative lg:h-[480px] lg:w-[268px] md:h-[300px] md:w-[200px] h-[280px] w-[158px]">
      <div
        className="bg-white absolute inset-0"
        style={{
          clipPath:
            "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
        }}
      ></div>

      <div
        className="absolute inset-[4px] text-white bg-cover bg-center bg-no-repeat flex"
        style={{
          clipPath:
            "polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)",
          backgroundImage: `url(${image})`,
        }}
      >
        <h3
          className="text-xl font-bold mt-100 mx-auto"
          style={{
            textShadow:
              "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.8)",
          }}
        >
          {title}
        </h3>

        <h3 className="hidden text-sm font-bold mt-100 mx-auto">
          {description}
        </h3>
      </div>
    </div>
  );
};

export default Card;
