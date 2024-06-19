interface IconProps {
  size?: number;
}

export default function EmptyHeartIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.7963 3.5C22.9055 3.5 25.6666 7.41125 25.6666 11.06C25.6666 18.4494 14.2074 24.5 14 24.5C13.7926 24.5 2.33331 18.4494 2.33331 11.06C2.33331 7.41125 5.09442 3.5 9.20368 3.5C11.5629 3.5 13.1055 4.69437 14 5.74437C14.8944 4.69437 16.437 3.5 18.7963 3.5Z"
        stroke="#333"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
