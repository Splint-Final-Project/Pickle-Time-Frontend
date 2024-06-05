import SpecialPickleCardArrowIcon from '@/assets/icons/SpecialPickleCardArrowIcon';
import styled from '@emotion/styled';
import HeartButton from '../common/button/HeartButton';
import BackImg from '@/assets/images/specialPickleCardBackImg.png';
export default function SpecialPickleCard() {
  return (
    <S.CardLayer href="/">
      <S.Wrap>
        <S.DeadlineBadge>D-15</S.DeadlineBadge>
        <HeartButton size={14} />
      </S.Wrap>
      <S.Title>명동 나이트 러닝 6km 서울 RUN!</S.Title>
      <S.ResgisterStatus>
        6명 중 <span>3</span>명이 신청하는 중
      </S.ResgisterStatus>
      <S.Price>
        10,000<span>원</span>
      </S.Price>
      <S.Circle>
        <SpecialPickleCardArrowIcon />
      </S.Circle>
    </S.CardLayer>
  );
}

const S = {
  CardLayer: styled.a`
    display: block;
    margin: auto;
    width: 14.4rem;
    height: 16.5rem;
    border-radius: 0.4rem;
    background: #fff;
    padding: 1.2rem 1rem 1.5rem 1.5rem;
    color: #161616;
    position: relative;
    box-shadow: 0.5px 0.5px 2px 0px rgba(0, 0, 0, 0.25);
    transition: 0.5s;
    background-image: url(${BackImg});
    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 2.5px 2.5px 2.8px 2px rgba(0, 0, 0, 0.25);
    }
  `,
  Wrap: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  DeadlineBadge: styled.span`
    display: inline-block;
    min-width: 2.8rem;
    height: 1.3rem;
    padding: 0 0.6rem;
    background: #dbd8d8;
    border-radius: 0.8rem;
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 1.3rem;
    margin-bottom: 1.6rem;
  `,
  Title: styled.h3`
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 120.983%;
    letter-spacing: -0.8px;
    margin-bottom: 1.2rem;
  `,
  ResgisterStatus: styled.span`
    display: inline-block;
    width: 56%;
    color: rgba(111, 111, 111, 0.6);
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: normal;
    margin-bottom: 0.6rem;
    span {
      font-weight: bold;
    }
  `,
  Price: styled.em`
    font-size: 2rem;
    font-weight: 600;
    line-height: normal;
    display: flex;
    align-items: center;
    span {
      font-size: 1.2rem;
      font-weight: 500;
      color: #2c2c2c;
      margin-left: 0.2rem;
      transform: translateY(1.2px);
    }
  `,
  Circle: styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #0ac50a;
    position: absolute;
    bottom: 1.7rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
