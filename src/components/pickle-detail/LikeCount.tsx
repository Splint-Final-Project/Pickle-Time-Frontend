import styled from '@emotion/styled';
import HeartButton from '@/components/common/button/HeartButton';
import useHeartButtonClick from '@/hooks/useHeartButtonClick';

interface LikeCountProps {
  pickleId: string;
}

export default function LikeCount({ pickleId }: LikeCountProps) {
  const { isLiked, like, handleHeartClick } = useHeartButtonClick(pickleId);

  return (
    <S.Container>
      <HeartButton size={20} isActive={isLiked} onClick={handleHeartClick} />
      <S.LikeCount>{like}</S.LikeCount>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  LikeCount: styled.span`
    ${({ theme }) => theme.typography.body1}
  `,
};
