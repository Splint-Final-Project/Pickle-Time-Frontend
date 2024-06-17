import styled from '@emotion/styled';
import CardBackImg from '@/assets/images/todayPickleCardBackImg.svg';
import ClockIcon from '@/assets/icons/ClockIcon';
import AddressIcon from '@/assets/icons/AddressIcon';
export default function TodayPickleCard() {
  return (
    <S.CardContainer>
      <S.Card>
        <S.CardHeader>
          <S.HeaderWrap>
            <S.CardLogo>오늘의 피클 타임</S.CardLogo>
            <S.FinishDate>~ 09.11</S.FinishDate>
          </S.HeaderWrap>
          <S.CardTitle>토익 성적 850 목표 스터디</S.CardTitle>
        </S.CardHeader>
        <S.CardBody>
          <S.AlertMessage>! 피클 한 시간 전이에요</S.AlertMessage>
          <S.PickleTime>
            <S.IconBox>
              <ClockIcon />
            </S.IconBox>
            <span>01 : 00pm ~ 05 : 00pm</span>
          </S.PickleTime>
          <S.PickleAddress>
            <S.IconBox>
              <AddressIcon />
            </S.IconBox>
            <span>
              스타벅스 약수점 <br />
              <S.RestAddress>서울특별시 중구 다산로 35 (건물 2층)</S.RestAddress>
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
  Card: styled.div`
    padding: 2.8rem 2.5rem;
    background-image: url(${CardBackImg});
    background-repeat: no-repeat;
    background-size: contain;
    color: #fff;
    width: 100%;
    position: relative;
    z-index: 100;
  `,
  CardHeader: styled.div`
    margin-bottom: 5.4rem;
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
