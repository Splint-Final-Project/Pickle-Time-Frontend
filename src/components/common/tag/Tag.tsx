import { ReactNode } from "react"
import TagDeleteIcon from '/public/icons/TagDelete.svg';
import styled from "@emotion/styled"

interface TagInterface {
  children: ReactNode,
  handleRemove?: () => void,
  hasHandler : boolean,
}

export default function Tag({ children, handleRemove, hasHandler }: TagInterface) {
  return (
    <S.Container>
      <S.Text>{children}</S.Text>
      {hasHandler ? (
        <S.IconImg src={TagDeleteIcon} onClick={handleRemove}/>
      ): (
        null
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: 3.0rem;
    flex-shrink: 0;
    border-radius: 0.4rem;
    border: 0.1rem solid #5DC26D;
    padding: 1rem;
  `,

  Text: styled.span`
    color: #5DC26D;
    font-family: Pretendard;
    font-size: 1.2rem;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
  `,

  IconImg: styled.img`
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
    margin-left: 0.5rem; /* 아이콘과 텍스트 사이의 간격 조정 */
    cursor: pointer; /* 클릭 가능한 아이콘을 위한 커서 변경 */
  `
}