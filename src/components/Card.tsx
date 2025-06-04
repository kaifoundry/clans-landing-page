'use client';

import { useState } from 'react';

type CardProps = {
  image: string;
  hoverImage?: string;
  title: string;
  description: string;
  width?: Number;
  height?: Number;
  glowColor?: string;
};

const Card = ({ image, hoverImage, title, glowColor = 'red' }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const clipPathStyle =
    'polygon(18% 0%, 90% 0%, 100% 6%, 100% 88%, 80% 100%, 6% 100%, 0% 95%, 0% 10%)';

  return (
    <div
      className='group flex flex-col items-center gap-2'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className='relative h-[280px] w-[158px] md:h-[300px] md:w-[200px] lg2:h-[400px] lg2:w-[220px] xl:h-[480px] xl:w-[268px]'
        style={{
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Dynamic Border with glowColor */}
        <div
          className='absolute inset-0'
          style={{
            clipPath: clipPathStyle,
            backgroundColor: isHovered ? glowColor : 'white',
            transition: 'background-color 0.3s ease',
            boxShadow: isHovered ? `0 0 1px ${glowColor}` : 'none',
          }}
        />

        <div className=''>
          <div
            className='absolute inset-[1.7px]'
            style={{ clipPath: clipPathStyle }}
          >
            {/* Default Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
            {/* Hover Image */}
            {hoverImage && (
              <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${hoverImage})` }}
              />
            )}
          </div>
        </div>
        {/* Image Layer */}
      </div>

      {/* Title Below Card */}
      <h3
        className='text-center text-lg font-semibold text-nowrap text-white'
        style={{
          textShadow: `
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000, 
     0 0 8px #fff,
     0 0 16px #fff,
      0 0 10px #fff,
  `,
        }}
      >
        {title}
      </h3>
    </div>
  );
};

export default Card;
