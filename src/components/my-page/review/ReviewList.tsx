import { useState } from 'react';
import styled from '@emotion/styled';
import Rating from '@/components/my-page/review/Rating';
import { MyDynamicTemplate } from '@/styles/commonStyles';

const mockData = [
  {
    id: '666fc6511259c037a9893425',
    title: '알고리즘 스터디✏️',
    imgUrl: 'https://avatars.githubusercontent.com/u/124874266?v=4',
    createdAt: '24.06.11',
    rating: 4,
    review:
      '텍스트리뷰텍스트리뷰니ㅏㄴㅇㄹㄴㅇㄹㄴㅇㄹ ㄴ이이이이이이ㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼',
  },
  {
    id: '666fc6511259c037a9893426',
    title: '자스 스터디🏷️',
    imgUrl: 'https://avatars.githubusercontent.com/u/124874266?v=4',
    createdAt: '24.06.10',
    rating: 5,
    review:
      '텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼',
  },
  {
    id: '666fc6511259c037a9893427',
    title: '리액트 스터디🔥',
    imgUrl: 'https://avatars.githubusercontent.com/u/124874266?v=4',
    createdAt: '24.06.09',
    rating: 3,
    review:
      '텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼',
  },
];

export default function ReviewList() {
  const [checkedReviews, setCheckedReviews] = useState<string[]>([]);

  const handleChecked = (id: string) => {
    if (checkedReviews.includes(id)) setCheckedReviews(checkedReviews.filter(item => item !== id));
    else setCheckedReviews([...checkedReviews, id]);
  };

  return (
    <MyDynamicTemplate>
      <h2>작성한 리뷰</h2>
      <h1>{mockData.length} 개</h1>
      <S.Delete $isChecked={checkedReviews.length > 0}>삭제하기</S.Delete>
      {mockData.map(review => (
        <S.Review key={review.id}>
          <S.Image src={review.imgUrl} alt="피클 이미지" />
          <S.TextInfoBox>
            <S.CheckBox
              onClick={() => handleChecked(review.id)}
              src={checkedReviews.includes(review.id) ? '/icons/filledCheck.svg' : '/icons/emptyCheck.svg'}
              alt="체크박스"
            />
            <span className="writing-date">{review.createdAt} 작성</span>
            <span className="pickle-title">{review.title}</span>
            <Rating rating={5} />
            <p>{review.review}</p>
          </S.TextInfoBox>
        </S.Review>
      ))}
    </MyDynamicTemplate>
  );
}

const S = {
  Review: styled.div`
    display: flex;
    gap: 1.7rem;
    padding: 1.5rem 0 4rem;
    border-bottom: ${({ theme }) => theme.border};
  `,

  Image: styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 1.5rem;
    object-fit: cover;
  `,

  Delete: styled.div<{ $isChecked: boolean }>`
    text-align: end;
    color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.accent2 : theme.color.sub)};
    ${({ theme }) => theme.typography.body1};
    cursor: pointer;
  `,

  TextInfoBox: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;

    & .writing-date {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1};
    }

    & .pickle-title {
      ${({ theme }) => theme.typography.subTitle3};
    }

    p {
      ${({ theme }) => theme.typography.body1};
    }
  `,

  CheckBox: styled.img`
    position: absolute;
    top: 0;
    right: 0.4rem;
    cursor: pointer;
  `,
};
