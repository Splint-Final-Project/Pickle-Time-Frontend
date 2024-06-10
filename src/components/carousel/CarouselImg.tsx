import styled from '@emotion/styled';

interface CarouselType {
  id: string;
  img: string;
  content: string;
  semiContent: string;
}

export default function CarouselImg({ id, img, content, semiContent }: CarouselType) {
  return (
    <S.CarouselImg img={img} id={id}>
      {id === '1' ? (
        <S.ContentContainer id={id}>
          <S.CarouselContent id={id}>{content}</S.CarouselContent>
          <S.CarouselSemiContent id={id}>{semiContent}</S.CarouselSemiContent>
        </S.ContentContainer>
      ) : (
        <S.ContentContainer id={id}>
          <S.CarouselSemiContent id={id}>{semiContent}</S.CarouselSemiContent>
          <S.CarouselContent id={id}>{content}</S.CarouselContent>
        </S.ContentContainer>
      )}
    </S.CarouselImg>
  );
}

const S = {
  CarouselImg: styled.div<{ img: string }>`
    width: 100%;
    height: 26.8rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${props => props.img}) lightgray center / 100% no-repeat;
    background-size: cover;
    position: relative;
    color: white;
    justify-content: ${props => (props.id !== '2' ? 'flex-start' : 'center')};
    align-items: ${props => (props.id == '3' ? 'flex-end' : 'center')};
  `,

  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${props => (props.id === '1' ? '3rem 4rem' : '4.0rem')};
    height: ${props => (props.id === '1' ? '100%' : '')};

    @media (max-width: 450px) {
      padding: ${props => (props.id === '1' ? '3.0rem 4rem' : '4.0rem')};
    }
  `,

  CarouselContent: styled.span`
    width: 22.4rem;
    color: #fff;
    text-align: ${props => (props.id === '1' || props.id === '3' ? 'left' : 'center')};
    text-shadow: 0.3rem 0.3rem 0.9rem #000;

    font-size: 2.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 3.5rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;

    @media (max-width: 450px) {
      font-size: 2.2rem;
      line-height: 2.64rem;
    }
  `,

  CarouselSemiContent: styled.span`
    color: #fff;
    text-align: ${props => (props.id === '1' || props.id === '3' ? 'left' : 'center')};
    text-shadow: 0 0 0.55rem rgba(0, 0, 0, 0.7);

    font-size: 1.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.3rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;

    @media (max-width: 450px) {
      font-size: 1rem;
      line-height: 1.2rem;
    }
  `,
};
