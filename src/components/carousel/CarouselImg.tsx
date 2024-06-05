import styled from '@emotion/styled';

interface CarouselType {
  id: string;
  img: string, 
  content: string, 
  semiContent: string
}

export default function CarouselImg({id, img, content, semiContent}: CarouselType) {
  return (
    <S.CarouselImg img={img} id={id}>
        {id === "1" ? (
          <S.ContentContainer id={id}>
            <S.CarouselContent id={id}>{content}</S.CarouselContent>
            <S.CarouselSemiContent id={id}>{semiContent}</S.CarouselSemiContent>
          </S.ContentContainer>
        ): (
          <S.ContentContainer id={id}>
            <S.CarouselSemiContent id={id}>{semiContent}</S.CarouselSemiContent>
            <S.CarouselContent id={id}>{content}</S.CarouselContent>
          </S.ContentContainer>
        )}
    </S.CarouselImg>
  )
}

const S = {
  CarouselImg: styled.div<{ img: string }>`
    width: 100%;
    height: 26.8rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${props => props.img}) lightgray -0.366px 0px / 110.001% 105.096% no-repeat;
    position: relative;
    color: white;
    justify-content: ${props => (props.id !== "2" ? 'flex-start' : 'center')};
    align-items: ${props => (props.id !== "2" ? 'flex-end' : 'center')};
  `,

  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${props => (props.id === "1" ? '2.0rem' : '2.0rem 0')};
    gap: ${props => (props.id === "1" ? '12.0rem' : '0rem')};
  `,

  CarouselContent: styled.span`
    width: 22.4rem;
    color: #FFF;
    text-align: ${props => (props.id === "1" ? 'left' : 'center')};
    text-shadow: 0.3rem 0.3rem  0.9rem #000;
    font-family: Pretendard;
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.64rem; /* 26.376px */
    white-space: pre-wrap; /* 공백을 유지하며 요소의 너비를 초과하면 줄바꿈 */
    word-wrap: break-word; /* 긴 단어가 요소의 너비를 초과하면 줄바꿈 */
    word-break: break-word; /* 단어가 깨지더라도 줄바꿈 */
  `,

  CarouselSemiContent: styled.span`
    width: ${props => (props.id === "3" ? '16.8rem' : '22.4rem')};
    color: #FFF;
    text-align: ${props => (props.id !== "2" ? 'left' : 'center')};
    text-shadow: 0 0 0.55rem rgba(0, 0, 0, 0.70);
    font-family: Pretendard;
    font-size: 1.0rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.2rem;
    white-space: pre-wrap; /* 공백을 유지하며 요소의 너비를 초과하면 줄바꿈 */
    word-wrap: break-word; /* 긴 단어가 요소의 너비를 초과하면 줄바꿈 */
    word-break: break-word; /* 단어가 깨지더라도 줄바꿈 */
  `,
};
