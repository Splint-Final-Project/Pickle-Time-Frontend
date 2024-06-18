import styled from '@emotion/styled';
import HeartButton from '@/components/common/button/HeartButton';
import { useDeletePickleLikeMutation, useGetLikeCount, usePickleLikeMutation } from '@/hooks/query/like';
import { When } from '@/apis/types/pickles.type';
import { formatCurrency, formatDays, formatPeriod } from '@/utils/formatData';

interface AroundPickleProps {
  pickleId: string;
  title: string;
  imgUrl: string;
  when: When;
  cost: number;
}

export default function AroundPickleCard({ pickleId, title, imgUrl, when, cost }: AroundPickleProps) {
  const { data } = useGetLikeCount(pickleId);
  const { mutate: postLikeMutate } = usePickleLikeMutation(pickleId);
  const { mutate: deleteLikeMutate } = useDeletePickleLikeMutation(pickleId);

  const handleHeartClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (data && data.data.length) {
      deleteLikeMutate();
    } else if (data && !data.data.length) {
      postLikeMutate();
    }
  };

  const date = formatPeriod(when);
  const days = formatDays(when);

  //TODO: 하트가 이미지 위에서 잘 안보이기 때문에 EmptyHeart에 border 좀 더 밝은색 띄울 수 있도록 해야함
  return (
    <S.Container>
      <HeartButton
        isActive={data?.data.isClicked}
        onClick={handleHeartClick}
        size={20}
        style={{ position: 'absolute', top: '1rem', right: '1rem' }}
      />
      <S.ThumbnailImg src={imgUrl} alt="피클 이미지" />
      <S.TextInfoBox>
        <S.Title>{title}</S.Title>
        <S.BottomText>
          <S.Time>
            <span className="date">{date}</span>
            <span className="days">{days}</span>
          </S.Time>
          <S.Cost>{formatCurrency(cost)}원</S.Cost>
        </S.BottomText>
      </S.TextInfoBox>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    position: relative;
    max-width: 32.2rem;
    border-radius: 1.2rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  `,

  ThumbnailImg: styled.img`
    width: 100%;
    height: 12.3rem;
    object-fit: cover;
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;
    background-color: #ccc;
  `,

  TextInfoBox: styled.div`
    padding: 1.5rem 1.7rem 2rem 1.7rem;
  `,

  Title: styled.span`
    color: #292929;
    ${({ theme }) => theme.typography.subTitle2}
  `,

  BottomText: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 0.5rem;
    color: ${({ theme }) => theme.color.sub};
  `,

  Time: styled.div`
    & .date {
      ${({ theme }) => theme.typography.body1};
      margin-right: 0.6rem;
    }

    & .days {
      ${({ theme }) => theme.typography.body2}
    }
  `,

  Cost: styled.span`
    color: #292929;
    ${({ theme }) => theme.typography.subTitle2}
  `,
};