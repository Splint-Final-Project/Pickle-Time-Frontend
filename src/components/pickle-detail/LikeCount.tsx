import styled from '@emotion/styled';
import HeartButton from '@/components/common/button/HeartButton';
import useHeartButtonClick from '@/hooks/useHeartButtonClick';

interface LikeCountProps {
  pickleId: string;
  likeCount: number;
}

export default function LikeCount({ pickleId, likeCount = 0 }: LikeCountProps) {
  const { isLiked, handleHeartClick } = useHeartButtonClick(pickleId);

  // 이 로직 없어도 됩니다. 이유: 뮤테이션으로 좋아요 개수는 누르자 마자, 갱신됩니다.
  // const updateLikeCount = () => {
  //   if (isLiked) {
  //     return likeCount + 1;
  //   }
  //   return likeCount;
  // };

  return (
    <S.Container>
      <HeartButton size={20} isActive={isLiked} onClick={handleHeartClick} />
      <S.LikeCount>{likeCount}</S.LikeCount>
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
