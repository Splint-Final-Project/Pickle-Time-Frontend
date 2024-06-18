interface PageNationNextArrowIconProps {
  isActive: boolean;
}

export default function PageNationNextArrowIcon({ isActive }: PageNationNextArrowIconProps) {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        id="Vector"
        d="M1 9L5 5L1 1"
        stroke={isActive ? '#000' : '#D0D0D0'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
