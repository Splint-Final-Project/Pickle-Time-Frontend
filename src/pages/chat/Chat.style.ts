import styled from '@emotion/styled';

export const S = {
  Container: styled.div`
    height: 100%;
    position: relative;
    overflow: auto;
  `,

  Header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 8rem;
    padding: 4rem 2rem 2rem;
  `,

  HeaderTitle: styled.span`
    ${({ theme }) => theme.typography.subTitle3};
  `,

  ArrowIcon: styled.img`
    width: 0.7rem;
    height: 1.3rem;
    flex-shrink: 0;
  `,

  Gongji: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 6.4rem;
    padding: 0rem 2rem 2rem;
    flex-shrink: 0;
    border-radius: 0 0 2rem 2rem;
    background: ${({ theme }) => theme.color.secondary2};
  `,

  GongjiWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  GongjiText: styled.span`
    ${({ theme }) => theme.typography.body1};
  `,

  MessageContainer: styled.div`
    height: 74vh;
    overflow-y: auto;
    flex-grow: 1;
  `,

  ForRefInMessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
  `,

  MessageLayout: styled.form`
    position: fixed;
    bottom: 0rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 767px;
    margin: 2rem 1rem;
  `,

  InputWrapper: styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 1rem;
    width: 90%;
    height: 4.1rem;
    padding: 2rem;
    border-radius: 2rem;
    background: ${({ theme }) => theme.color.card};
  `,

  InputMessage: styled.input`
    width: 100%;
    border: none;
    background: #f3f4f6;
  `,

  MessageImg: styled.img`
    cursor: pointer;
  `,

  BaseImg: styled.img`
    cursor: pointer;
  `,
};
