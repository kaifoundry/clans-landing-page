const StartButtonBorder = () => (
  <svg
    width='100%'
    height='100%'
    viewBox='0 0 309 81'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='absolute top-0 left-0 h-full w-full opacity-50'
    preserveAspectRatio='none'
  >
    <path
      d='M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5H1V69.5L3 67.5V49.5L1 48V1H8.5Z'
      className='fill-black transition-colors duration-300 group-hover:fill-[rgba(212,0,165,0.16)]'
    />
    <path
      d='M8.5 1H71.5L77 5.5H308V70.5L298.5 80H8.5M8.5 1V80M8.5 1H1V48L3 49.5V67.5L1 69.5V80H8.5'
      stroke='white'
      strokeOpacity='0.4'
      strokeWidth='1.5'
    />
  </svg>
);

export default StartButtonBorder;
