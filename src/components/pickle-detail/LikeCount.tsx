import styled from '@emotion/styled';
import HeartButton from '@/components/common/button/HeartButton';
import { useDeletePickleLikeMutation, usePickleLikeMutation, useGetLikeCount } from '@/hooks/query/like';

interface LikeCountProps {
  pickleId: string;
}

export default function LikeCount({ pickleId }: LikeCountProps) {
  const { data } = useGetLikeCount(pickleId);
  const { mutate: postLikeMutate } = usePickleLikeMutation(pickleId);
  const { mutate: deleteLikeMutate } = useDeletePickleLikeMutation(pickleId);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (data?.data.isClicked) {
      deleteLikeMutate();
    } else {
      postLikeMutate();
    }
  };

  return (
    <S.Container>
      <HeartButton size={20} $active={data?.data.isClicked} onClick={handleHeartClick} />
      <S.LikeCount>{data?.data.likeCount}</S.LikeCount>
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
