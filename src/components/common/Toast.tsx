import { toast } from 'react-hot-toast';
import styled from '@emotion/styled';

interface ToastProps {
  message: string;
  type?: string;
}

export default function CustomToast({ message, type = 'complete' }: ToastProps) {
  const icon = type === 'complete' ? '/icons/mainCharacterIcon.svg' : '/icons/errorCharacterIcon.svg';

  return (
    <S.Container>
      <img src={icon} alt="메인 캐릭터 아이콘" width={33} />
      <span>{message}</span>
    </S.Container>
  );
}

export const showToast = (message: string, type = 'complete') => {
  toast.custom(t => <CustomToast message={message} type={type} />, {
    duration: 1000,
    position: 'top-center',
  });
};

export const showErrorToast = (message: string) => {
  showToast(message, 'error');
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    min-width: 27.5rem;
    padding: 1.7rem 3rem;
    border-radius: 1rem;
    background-color: #182922;
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.3);
    color: ${({ theme }) => theme.color.white};
    ${({ theme }) => theme.typography.subTitle3};
    animation: fadeInOut 6s;

    @keyframes fadeInOut {
      0%,
      100% {
        opacity: 0;
        transform: translateY(20px);
      }
      10%,
      90% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
};
