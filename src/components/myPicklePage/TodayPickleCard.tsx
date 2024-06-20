import styled from '@emotion/styled';
import CardBackImg from '@/assets/images/todayPickleCardBackImg.svg';
import ClockIcon from '@/assets/icons/ClockIcon';
import AddressIcon from '@/assets/icons/AddressIcon';
import Character from '@/assets/icons/character.svg';
type CardDataType = {
  title: string;
  finishDate: string;
  time: string;
  startTime: string;
  address: string;
  detailAddress: string;
  isNearby?: boolean;
};

interface TodayPickleCardProps {
  cardData: CardDataType;
}

export default function TodayPickleCard({ cardData }: TodayPickleCardProps) {
  return (
    <S.CardContainer>
      <S.Character />
      <S.Card>
        <S.CardHeader>
          <S.HeaderWrap>
            <S.CardLogo>오늘의 피클 타임</S.CardLogo>
            <S.FinishDate>{cardData.finishDate}</S.FinishDate>
          </S.HeaderWrap>
          <S.CardTitle>{cardData.title}</S.CardTitle>
        </S.CardHeader>
        <S.CardBody>
          <S.AlertMessage>! 피클 한 시간 전이에요</S.AlertMessage>
          <S.PickleTime>
            <S.IconBox>
              <ClockIcon />
            </S.IconBox>
            <span>{cardData.time}</span>
          </S.PickleTime>
          {cardData.isNearby && <S.AlertMessage>! 1km 남았어요</S.AlertMessage>}
          <S.PickleAddress>
            <S.IconBox>
              <AddressIcon />
            </S.IconBox>
            <span>
              {cardData.address} <br />
              <S.RestAddress>{cardData.detailAddress}</S.RestAddress>
            </span>
          </S.PickleAddress>
        </S.CardBody>
      </S.Card>
    </S.CardContainer>
  );
}

const S = {
  CardContainer: styled.div`
    position: relative;
    width: 100%;
    margin: auto;

    &::before {
      content: '';
      width: 32.5rem;
      height: 8.9rem;
      background: #dedede;
      border-radius: 0.7rem;
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
    }
  `,
  Character: styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    background-image: url(${Character});
    background-repeat: no-repeat;
    background-size: contain;
    top: -2.1rem;
    left: 1.5rem;
    z-index: 200;
  `,
  Card: styled.div`
    padding: 2.8rem 2.5rem;
    background-image: url(${CardBackImg});
    background-repeat: no-repeat;
    background-size: contain;
    color: #fff;
    width: 100%;
    min-height: 23.4rem;
    position: relative;
    z-index: 100;
  `,
  CardHeader: styled.div`
    margin-bottom: 2.7rem;
  `,
  HeaderWrap: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  `,
  CardLogo: styled.span`
    font-size: 1.6rem;
    color: #3ea24e;
  `,
  FinishDate: styled.span`
    font-size: 1.4rem;
    color: #8b8d94;
  `,
  CardTitle: styled.h2`
    font-size: 2rem;
    font-weight: 600;
  `,
  CardBody: styled.div`
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  AlertMessage: styled.span`
    color: #f66;
  `,
  PickleTime: styled.p`
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-style: normal;
  `,
  IconBox: styled.span`
    display: inline-block;
    height: 1.6rem;
  `,
  PickleAddress: styled.p`
    display: flex;
    gap: 0.8rem;
  `,
  RestAddress: styled.span`
    display: inline-block;
    margin-top: 0.5rem;
    color: #b5b5b5;
  `,
};
