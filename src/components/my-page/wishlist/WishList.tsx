import SpecialPickleCard from '@/components/picklecard/SpecialPickleCard';
import { MyDynamicTemplate, WishListGridTemplate } from '@/styles/commonStyles';
import styled from '@emotion/styled';

const wishListPickle = [
  {
    id: '666fc6511259c037a9893425',
    title: '알고리즘 스터디',
    capacity: 3,
    participantNumber: 1,
    deadLine: '2024-06-10T23:00:00.000Z',
    where: '버터 앞',
    when: {
      summary: '사흘 간',
      times: [
        '2024-06-13T07:00:00.000Z',
        '2024-06-14T07:00:00.000Z',
        '2024-06-15T07:00:00.000Z',
        '2024-06-16T07:00:00.000Z',
      ],
    },
    cost: 10000,
    latitude: 37.5636,
    longtitude: 126.982,
  },
  {
    id: '666fc6511259c037a9893425',
    title: '알고리즘 스터디',
    capacity: 3,
    participantNumber: 1,
    deadLine: '2024-06-10T23:00:00.000Z',
    where: '버터 앞',
    when: {
      summary: '사흘 간',
      times: [
        '2024-06-13T07:00:00.000Z',
        '2024-06-14T07:00:00.000Z',
        '2024-06-15T07:00:00.000Z',
        '2024-06-16T07:00:00.000Z',
      ],
    },
    cost: 10000,
    latitude: 37.5636,
    longtitude: 126.982,
  },
  {
    id: '666fc6511259c037a9893425',
    title: '알고리즘 스터디',
    capacity: 3,
    participantNumber: 1,
    deadLine: '2024-06-10T23:00:00.000Z',
    where: '버터 앞',
    when: {
      summary: '사흘 간',
      times: [
        '2024-06-13T07:00:00.000Z',
        '2024-06-14T07:00:00.000Z',
        '2024-06-15T07:00:00.000Z',
        '2024-06-16T07:00:00.000Z',
      ],
    },
    cost: 10000,
    latitude: 37.5636,
    longtitude: 126.982,
  },
];

export default function WishList() {
  return (
    <S.Container>
      <h2>찜한 피클</h2>
      <S.InnerWrap>
        {wishListPickle ? (
          <WishListGridTemplate>
            {wishListPickle.map(pickle => (
              <SpecialPickleCard key={pickle.id} pickleData={pickle} />
            ))}
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
    padding: 1.8rem 1.4rem 0;
  `,

  NoData: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 32rem;
  `,
};
