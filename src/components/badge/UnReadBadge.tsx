import styled from "@emotion/styled"

export default function UnreadBadge({ unReadNumber}: {unReadNumber: number}) {
  return (
    <S.Container> +{unReadNumber}</S.Container>
  )
}

const S = {
  Container: styled.div`
    position: absolute;
    right: 0.5rem;
    top: -0.5rem;
    border-width: 1rem;
    border: 1px solid red;
    border-radius: 10rem;
    background-color: red;
    padding: 0.3rem;
    color: white;
  `
}