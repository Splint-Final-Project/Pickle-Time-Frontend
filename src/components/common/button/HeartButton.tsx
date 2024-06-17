import { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import EmptyHeartIcon from '@/assets/icons/EmptyHeartIcon';
import FilledHeartIcon from '@/assets/icons/FilledHeartIcon';

interface HeartProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $isActive: boolean;
  size?: number;
}

export default function HeartButton({ $isActive, size, ...htmlButtonProps }: HeartProps) {
  return (
    <S.Container {...htmlButtonProps}>
      {$isActive ? <FilledHeartIcon size={size} /> : <EmptyHeartIcon size={size} />}
    </S.Container>
  );
}

const S = {
  Container: styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 2.5rem;
    background-color: transparent;
  `,
};
