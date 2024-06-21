import styled from '@emotion/styled';
import SpecialPickleCard from '@/components/picklecard/SpecialPickleCard';
import { MyDynamicTemplate, WishListGridTemplate } from '@/styles/commonStyles';
import { useGetLikePickles } from '@/hooks/query/like';

export default function WishList() {
  const { data: wishListData } = useGetLikePickles();

  return (
    <S.Container>
      <h2>찜한 피클</h2>
      <S.InnerWrap>
        {wishListData ? (
          <WishListGridTemplate>
            {wishListData?.pages.map(page =>
              page?.data.map((pickle: any) => <SpecialPickleCard key={pickle.id} pickleData={pickle} />),
            )}
          </WishListGridTemplate>
        ) : (
          <S.NoData>아직 찜한 피클이 없어요 🥒</S.NoData>
        )}
      </S.InnerWrap>
    </S.Container>
  );
}

const S = {
  Container: styled(MyDynamicTemplate)`
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
  InnerWrap: styled.div`
    padding: 1.8rem 1.7rem 0;
  `,

  NoData: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 32rem;
    color: ${({ theme }) => theme.color.sub};
    ${({ theme }) => theme.typography.body1};
  `,
};
