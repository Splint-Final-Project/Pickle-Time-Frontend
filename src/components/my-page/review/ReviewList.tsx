import { MyDynamicTemplate } from '@/styles/commonStyles';
import styled from '@emotion/styled';
import Rating from './Rating';

export default function ReviewList() {
  return (
    <MyDynamicTemplate>
      <h2>작성한 리뷰</h2>
      <h1>12 개</h1>
      <S.Review>
        <S.Image src="https://avatars.githubusercontent.com/u/124874266?v=4" alt="프로필 이미지" />
        <S.TextInfoBox>
          <S.CheckBox src="/icons/emptyCheck.svg" alt="체크박스" />
          <span className="writing-date">24.06.11 작성</span>
          <span className="pickle-title">토익 850 목표 스터디</span>
          <Rating rating={5} />
          <p>텍스트리뷰텍스트리뷰니ㅏㅇ러ㅐ쟈ㅓ래;ㅑ저ㅐㅇ랴ㅓㅈ;ㅐ야러ㅐ쟈얼</p>
        </S.TextInfoBox>
      </S.Review>
    </MyDynamicTemplate>
  );
}

const S = {
  Review: styled.div`
    display: flex;
    gap: 1.7rem;
    padding: 2.2rem 0 4rem;
    border-bottom: ${({ theme }) => theme.border};
  `,

  Image: styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 1.5rem;
    object-fit: cover;
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
  `,
};
