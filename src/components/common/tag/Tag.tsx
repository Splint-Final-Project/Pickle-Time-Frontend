import { ReactNode } from 'react';
import styled from '@emotion/styled';
import TagDeleteIcon from '/icons/TagDelete.svg';

interface TagInterface {
  children: ReactNode;
  handleRemove?: () => void;
  hasHandler: boolean;
}

export default function Tag({ children, handleRemove, hasHandler }: TagInterface) {
  return (
    <S.Container hasHandler={hasHandler}>
      <S.Text>{children}</S.Text>
      {hasHandler ? <S.IconImg src={TagDeleteIcon} onClick={handleRemove} /> : null}
    </S.Container>
  );
}

const S = {
  Container: styled.div<{ hasHandler: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    border: ${({ hasHandler }) => (hasHandler ? '0.1rem solid rgba(93, 194, 109, 1)' : '')};
    padding: 1rem;
    background-color: ${({ hasHandler }) => (hasHandler ? 'rgba(255, 255, 255, 0)' : 'rgba(93, 194, 109, 0.15)')};
  `,

  Text: styled.span`
    color: #5dc26d;
    font-size: 1.2rem;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
  `,

  IconImg: styled.img`
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
    margin-left: 0.5rem;
    cursor: pointer;
  `,
};
