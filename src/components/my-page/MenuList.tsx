import styled from '@emotion/styled';

export default function MenuList() {
  return (
    <S.MenuContainer>
      <S.Item className="point">
        <img src="/icons/mypage-menu/pointIcon.svg" alt="포인트" />
        <span>포인트</span>
      </S.Item>
      <S.Item className="review">
        <img src="/icons/mypage-menu/reviewIcon.svg" alt="리뷰 관리" />
        <span>리뷰 관리</span>
      </S.Item>
      <S.Item className="wishlist">
        <img src="/icons/mypage-menu/likeIcon.svg" alt="찜한 피클" />
        <span>찜한 피클</span>
      </S.Item>
    </S.MenuContainer>
  );
}

const S = {
  MenuContainer: styled.ul`
    display: flex;
    width: 100%;

    & .review {
      border-left: 1px solid #bababa;
      border-right: 1px solid #bababa;
    }
  `,

  Item: styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    gap: 1rem;
    cursor: pointer;

    span {
      color: ${({ theme }) => theme.color.sub};
      ${({ theme }) => theme.typography.body1}
    }
  `,
};
