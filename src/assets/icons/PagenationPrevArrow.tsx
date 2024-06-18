interface PageNationPrevArrowIconProps {
  isActive: boolean;
}

export default function PageNationPrevArrowIcon({ isActive }: PageNationPrevArrowIconProps) {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 1L1 5L5 9"
        stroke={isActive ? '#000' : '#D0D0D0'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
