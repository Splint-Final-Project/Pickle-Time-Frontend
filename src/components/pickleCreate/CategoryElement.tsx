import styled from '@emotion/styled';

interface CategoryInterface {
  id: number;
  title: string;
  content: string;
  src: any;
  selectedId: number | null;
  onClick: (clickedId: number) => void;
}

export default function CategoryElement({ id, title, content, src, selectedId, onClick }: CategoryInterface) {
  return (
    <S.Container>
      <S.Wrapper onClick={() => onClick(id)}>
        <S.TextWrapper>
          <S.TitleText $id={id} selectedId={selectedId}>
            {title}
          </S.TitleText>
          <S.ContentText $id={id} selectedId={selectedId}>
            {content}
          </S.ContentText>
        </S.TextWrapper>
        <S.Img $id={id} selectedId={selectedId} src={src} />
      </S.Wrapper>
      <S.DividingLine />
    </S.Container>
  );
}

const S = {
  Container: styled.div``,

  DividingLine: styled.div`
    height: 0.2rem;
    flex-shrink: 0;
    background-color: #ddd;
  `,

  Wrapper: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  `,

  TextWrapper: styled.div``,

  TitleText: styled.h2<{ $id: number; selectedId: number | null }>`
    color: ${({ $id, selectedId }) => ($id === selectedId ? '#181F29' : '#BABABA')};
    font-family: Pretendard;
    font-size: 2rem;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
  `,

  ContentText: styled.span<{ $id: number; selectedId: number | null }>`
    color: ${({ $id, selectedId }) => ($id === selectedId ? '#181F29' : '#BABABA')};
    font-family: Pretendard;
    font-size: 1.2rem;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
  `,

  Img: styled.img<{ $id: number; selectedId: number | null }>`
    width: 50px;
    height: 28.545px;
    flex-shrink: 0;
    opacity: ${({ $id, selectedId }) => ($id === selectedId ? 1 : 0.4)};
  `,
};
