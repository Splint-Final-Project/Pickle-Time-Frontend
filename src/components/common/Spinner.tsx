import styled from '@emotion/styled';

const StyledSpinner = styled.svg<{ $small?: boolean }>`
  align-self: center;
  animation: rotate 2s linear infinite;
  width: 30px;
  height: 30px;
  ${({ $small = false }) => ($small ? 'margin: 0;' : 'margin: 25px;')}

  & .path {
    stroke: #3d5c3b;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export function SmallSpinner() {
  return (
    <StyledSpinner $small={true} viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="15" fill="none" strokeWidth="2" />
    </StyledSpinner>
  );
}

export default function Spinner() {
  return (
    <StyledSpinner viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
    </StyledSpinner>
  );
}
